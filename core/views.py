# core/views.py

from django.utils import timezone
from django.db.models import Q, Count, Sum, Case, When, IntegerField, F, Value, DecimalField
from django.db.models.functions import Coalesce, TruncMonth, TruncDate

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import status

from .models import Usuario, Plan, Suscripcion, MetodoPago, Pago, WebhookEvento, Notificacion
from .serializers import (
    UsuarioSerializer, PlanSerializer, SuscripcionSerializer, MetodoPagoSerializer,
    PagoSerializer, WebhookEventoSerializer, NotificacionSerializer
)

# ---------- Helpers ----------
def _to_float(x):
    # Evita problemas de serialización con Decimal/None
    try:
        return float(x or 0)
    except Exception:
        return 0.0

# Forzamos que los Coalesce con montos usen Decimal en lugar de mezclar con Integer.
# Ajusta max_digits/decimal_places si tu modelo Pago.monto difiere.
ZERO_DEC = Value(0, output_field=DecimalField(max_digits=18, decimal_places=2))

def coalesce_money(expr):
    return Coalesce(expr, ZERO_DEC, output_field=DecimalField(max_digits=18, decimal_places=2))


# ---------- ViewSets CRUD básicos ----------
class UsuarioViewSet(ModelViewSet):
    queryset = Usuario.objects.all().order_by('-fecha_registro')
    serializer_class = UsuarioSerializer

class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all().order_by('nombre_plan')
    serializer_class = PlanSerializer

class SuscripcionViewSet(ModelViewSet):
    queryset = Suscripcion.objects.all().order_by('-fecha_inicio')
    serializer_class = SuscripcionSerializer

class MetodoPagoViewSet(ModelViewSet):
    queryset = MetodoPago.objects.all().order_by('-fecha_creacion')
    serializer_class = MetodoPagoSerializer

class PagoViewSet(ModelViewSet):
    queryset = Pago.objects.all().order_by('-fecha_hora')
    serializer_class = PagoSerializer

class WebhookEventoViewSet(ModelViewSet):
    queryset = WebhookEvento.objects.all().order_by('-fecha_recepcion')
    serializer_class = WebhookEventoSerializer

class NotificacionViewSet(ModelViewSet):
    queryset = Notificacion.objects.all().order_by('-id')
    serializer_class = NotificacionSerializer

    @action(detail=False, methods=['post'], url_path='simular')
    def simular(self, request):
        """
        Crea una notificación simulada.
        Reglas:
          - 'suscripcion_id' es obligatorio (o se infiere desde 'pago').
          - 'pago' es opcional; si no viene, intentamos enlazar uno relevante.
        """
        data = request.data.copy()

        # Defaults
        data.setdefault('asunto', 'Notificación de prueba')
        data.setdefault('mensaje', 'Este es un mensaje de prueba de QuickCollect')
        data.setdefault('canal', 'CORREO')
        data.setdefault('estado_envio', 'PENDIENTE')
        if 'cuerpo' not in data:
            data['cuerpo'] = data.get('mensaje', 'Este es un mensaje de prueba de QuickCollect')

        # 1) Determinar suscripción: preferimos lo que envía el cliente
        suscripcion_id = data.get('suscripcion') or data.get('suscripcion_id')
        pago_id = data.get('pago') or data.get('pago_id')

        if not suscripcion_id and pago_id:
            # Inferir suscripción desde el pago
            try:
                pago_obj = Pago.objects.get(id=pago_id)
                suscripcion_id = pago_obj.suscripcion_id
                data['suscripcion'] = suscripcion_id
            except Pago.DoesNotExist:
                return Response({"detalle": "El 'pago' indicado no existe."}, status=status.HTTP_400_BAD_REQUEST)

        if not suscripcion_id:
            return Response(
                {"detalle": "Falta 'suscripcion_id' (o envía 'pago' para inferirla)."},
                status=status.HTTP_400_BAD_REQUEST
            )
        else:
            data['suscripcion'] = suscripcion_id  # normaliza nombre de campo para el serializer

        # 2) Resolver 'pago' automáticamente si no viene
        if not pago_id:
            candidatos = (
                Pago.objects.filter(suscripcion_id=suscripcion_id)
                .order_by(
                    Case(When(estado__in=['PENDIENTE', 'VENCIDO'], then=0), default=1, output_field=IntegerField()),
                    '-fecha_hora'
                )
            )
            ultimo = candidatos.first()
            if ultimo:
                data['pago'] = ultimo.id  # opcionalmente lo enlazamos

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        noti = serializer.save()
        return Response(self.get_serializer(noti).data, status=status.HTTP_201_CREATED)
# ...existing code...

# Health check endpoint
class HealthAPIView(APIView):
    def get(self, request):
        return Response({"ok": True, "service": "quickcollect-api", "time": str(timezone.now())})


# ---------- Dashboard KPIs ----------
class DashboardResumenAPIView(APIView):
    """
    GET /api/dashboard/resumen/
    KPIs de alto nivel para el dashboard.
    Usa agregaciones filtradas (Sum/Count con filter=Q) y un ejemplo con Case/When.
    """
    def get(self, request):
        hoy = timezone.localdate()
        inicio_mes = hoy.replace(day=1)

        # === Conteos base ===
        total_usuarios = Usuario.objects.count()
        total_planes = Plan.objects.count()
        total_suscripciones = Suscripcion.objects.count()

        # Estados de suscripción (valores en mayúscula según tu modelo)
        susc_activas = Suscripcion.objects.filter(estado='ACTIVA').count()
        susc_pausadas = Suscripcion.objects.filter(estado='PAUSADA').count()
        susc_canceladas = Suscripcion.objects.filter(estado='CANCELADA').count()

        # === Pagos: montos y conteos por estado con filtros ===
        pagos_qs = Pago.objects.all()

        # Montos (todo en Decimal gracias a coalesce_money)
        monto_total = pagos_qs.aggregate(
            total=coalesce_money(Sum('monto'))
        )['total']

        montos_por_estado = pagos_qs.aggregate(
            aprobado=coalesce_money(Sum('monto', filter=Q(estado='APROBADO'))),
            rechazado=coalesce_money(Sum('monto', filter=Q(estado='RECHAZADO'))),
            pendiente=coalesce_money(Sum('monto', filter=Q(estado='PENDIENTE'))),
            vencido=coalesce_money(Sum('monto', filter=Q(estado='VENCIDO'))),
        )

        conteos_por_estado = pagos_qs.aggregate(
            aprobado=Count('id', filter=Q(estado='APROBADO')),
            rechazado=Count('id', filter=Q(estado='RECHAZADO')),
            pendiente=Count('id', filter=Q(estado='PENDIENTE')),
            vencido=Count('id', filter=Q(estado='VENCIDO')),
        )

        # === KPIs del mes actual ===
        pagos_mes = pagos_qs.filter(fecha_hora__date__gte=inicio_mes, fecha_hora__date__lte=hoy)

        aprobados_mes_qs = pagos_mes.filter(estado='APROBADO')
        aprobados_cnt = aprobados_mes_qs.count()
        monto_aprobado_mes = aprobados_mes_qs.aggregate(total=coalesce_money(Sum('monto')))['total']

        mes_actual = {
            "monto_total": _to_float(pagos_mes.aggregate(total=coalesce_money(Sum('monto')))['total']),
            "aprobados": aprobados_cnt,
            "rechazados": pagos_mes.filter(estado='RECHAZADO').count(),
            "ticket_promedio": _to_float(monto_aprobado_mes / aprobados_cnt) if aprobados_cnt else 0.0,
        }

        # === Serie por mes (últimos 6) usando TruncMonth + filtros ===
        desde_6m = (hoy.replace(day=1) - timezone.timedelta(days=31*5)).replace(day=1)
        serie_6m = (
            Pago.objects.filter(fecha_hora__date__gte=desde_6m, fecha_hora__date__lte=hoy)
            .annotate(mes=TruncMonth('fecha_hora'))
            .values('mes')
            .annotate(
                monto_total=coalesce_money(Sum('monto')),
                monto_aprobado=coalesce_money(Sum('monto', filter=Q(estado='APROBADO'))),
                cnt_aprobado=Count('id', filter=Q(estado='APROBADO')),
                cnt_rechazado=Count('id', filter=Q(estado='RECHAZADO')),
            )
            .order_by('mes')
        )

        serie_6m_list = [
            {
                "mes": item["mes"].date().isoformat() if hasattr(item["mes"], "date") else str(item["mes"]),
                "monto_total": _to_float(item["monto_total"]),
                "monto_aprobado": _to_float(item["monto_aprobado"]),
                "cnt_aprobado": item["cnt_aprobado"],
                "cnt_rechazado": item["cnt_rechazado"],
            }
            for item in serie_6m
        ]

        # === Ejemplo Case/When para KPI compuesto ===
        # Suscripciones con al menos un pago RECHAZADO en el mes actual.
        morosidad_por_suscripcion = (
            Pago.objects.filter(fecha_hora__date__gte=inicio_mes, fecha_hora__date__lte=hoy)
            .values('suscripcion_id')
            .annotate(
                flag_morosidad=Sum(
                    Case(
                        When(estado='RECHAZADO', then=1),
                        default=0,
                        output_field=IntegerField()
                    )
                )
            )
            .aggregate(
                suscripciones_morosas=Count('suscripcion_id', filter=Q(flag_morosidad__gt=0))
            )['suscripciones_morosas'] or 0
        )

        data = {
            "usuarios": {
                "total": total_usuarios
            },
            "planes": {
                "total": total_planes
            },
            "suscripciones": {
                "total": total_suscripciones,
                "activa": susc_activas,
                "pausada": susc_pausadas,
                "cancelada": susc_canceladas,
            },
            "pagos": {
                "monto_total": _to_float(monto_total),
                "montos_por_estado": {k: _to_float(v) for k, v in montos_por_estado.items()},
                "conteos_por_estado": conteos_por_estado,
                "mes_actual": mes_actual,
                "serie_6m": serie_6m_list,
            },
            "riesgos": {
                "suscripciones_morosas_mes_actual": morosidad_por_suscripcion
            }
        }
        return Response(data)
