from django.contrib import admin
from .models import Usuario, Plan, Suscripcion, MetodoPago, Pago, WebhookEvento, Notificacion

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "correo", "rol", "estado", "fecha_registro")
    search_fields = ("nombre", "correo")
    list_filter = ("rol", "estado")
    ordering = ("-fecha_registro",)

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre_plan", "valor", "periodicidad", "estado")
    list_filter = ("periodicidad", "estado")
    search_fields = ("nombre_plan",)

@admin.register(Suscripcion)
class SuscripcionAdmin(admin.ModelAdmin):
    list_display = ("id", "usuario", "plan", "estado", "fecha_inicio", "fecha_fin")
    list_filter = ("estado", "plan__periodicidad")
    search_fields = ("usuario__nombre", "usuario__correo")

@admin.register(MetodoPago)
class MetodoPagoAdmin(admin.ModelAdmin):
    list_display = ("id", "usuario", "tipo", "activo", "fecha_creacion")
    list_filter = ("tipo", "activo")
    search_fields = ("usuario__nombre", "usuario__correo")

@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display = ("id", "suscripcion", "monto", "estado", "fecha_hora", "referencia_externa")
    list_filter = ("estado",)
    search_fields = ("referencia_externa", "codigo_autorizacion", "suscripcion__usuario__correo")

@admin.register(WebhookEvento)
class WebhookEventoAdmin(admin.ModelAdmin):
    list_display = ("id", "pago", "tipo_evento", "fecha_recepcion")
    list_filter = ("tipo_evento",)

@admin.register(Notificacion)
class NotificacionAdmin(admin.ModelAdmin):
    list_display = ("id", "pago", "canal", "estado_envio", "fecha_envio", "asunto")
    list_filter = ("canal", "estado_envio")
    search_fields = ("asunto", "pago__id")
