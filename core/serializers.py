from rest_framework import serializers
from .models import Usuario, Plan, Suscripcion, MetodoPago, Pago, WebhookEvento, Notificacion

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = "__all__"

class SuscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suscripcion
        fields = "__all__"

class MetodoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetodoPago
        fields = "__all__"

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = "__all__"

class WebhookEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebhookEvento
        fields = "__all__"

from rest_framework.serializers import PrimaryKeyRelatedField

class NotificacionSerializer(serializers.ModelSerializer):
    suscripcion = PrimaryKeyRelatedField(queryset=Suscripcion.objects.all(), required=True)
    pago = PrimaryKeyRelatedField(queryset=Pago.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Notificacion
        fields = "__all__"
