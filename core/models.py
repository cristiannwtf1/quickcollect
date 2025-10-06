from django.db import models

# ==========================
# 1) USUARIO
# ==========================
class Usuario(models.Model):
    ROLES = [
        ('admin', 'Administrador'),
        ('cliente', 'Cliente'),
    ]
    ESTADOS = [
        ('ACTIVO', 'Activo'),
        ('INACTIVO', 'Inactivo'),
        ('MOROSO', 'Moroso'),
    ]

    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contrasena_hash = models.CharField(max_length=255)
    rol = models.CharField(max_length=10, choices=ROLES)
    estado = models.CharField(max_length=10, choices=ESTADOS, default='ACTIVO')
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} ({self.rol})"

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
        ordering = ["-fecha_registro"]


# ==========================
# 2) PLAN
# ==========================
class Plan(models.Model):
    PERIODICIDADES = [
        ('MENSUAL', 'Mensual'),
        ('TRIMESTRAL', 'Trimestral'),
        ('SEMESTRAL', 'Semestral'),
        ('ANUAL', 'Anual'),
    ]
    ESTADOS = [
        ('ACTIVO', 'Activo'),
        ('INACTIVO', 'Inactivo'),
    ]

    nombre_plan = models.CharField(max_length=80)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    periodicidad = models.CharField(max_length=15, choices=PERIODICIDADES)
    estado = models.CharField(max_length=10, choices=ESTADOS, default='ACTIVO')

    def __str__(self):
        return f"{self.nombre_plan} - {self.valor}"

    class Meta:
        verbose_name = "Plan"
        verbose_name_plural = "Planes"
        ordering = ["nombre_plan"]


# ==========================
# 3) SUSCRIPCION
# ==========================
class Suscripcion(models.Model):
    ESTADOS = [
        ('ACTIVA', 'Activa'),
        ('PAUSADA', 'Pausada'),
        ('CANCELADA', 'Cancelada'),
    ]

    usuario = models.ForeignKey(Usuario, on_delete=models.RESTRICT)
    plan = models.ForeignKey(Plan, on_delete=models.RESTRICT)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(null=True, blank=True)
    estado = models.CharField(max_length=10, choices=ESTADOS, default='ACTIVA')

    def __str__(self):
        return f"Suscripción {self.id} - {self.usuario.nombre}"

    class Meta:
        verbose_name = "Suscripción"
        verbose_name_plural = "Suscripciones"
        ordering = ["-fecha_inicio"]


# ==========================
# 4) METODO_PAGO
# ==========================
class MetodoPago(models.Model):
    TIPOS = [
        ('TOKEN_TARJETA', 'Token Tarjeta'),
        ('PSE', 'PSE'),
        ('BILLETERA', 'Billetera'),
    ]

    usuario = models.ForeignKey(Usuario, on_delete=models.RESTRICT)
    tipo = models.CharField(max_length=20, choices=TIPOS)
    token = models.CharField(max_length=100, null=True, blank=True)
    fecha_vencimiento = models.DateField(null=True, blank=True)
    activo = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tipo} - {self.usuario.nombre}"

    class Meta:
        verbose_name = "Método de pago"
        verbose_name_plural = "Métodos de pago"
        ordering = ["-fecha_creacion"]


# ==========================
# 5) PAGO
# ==========================
class Pago(models.Model):
    ESTADOS = [
        ('PENDIENTE', 'Pendiente'),
        ('APROBADO', 'Aprobado'),
        ('RECHAZADO', 'Rechazado'),
        ('VENCIDO', 'Vencido'),
    ]

    suscripcion = models.ForeignKey(Suscripcion, on_delete=models.RESTRICT)
    metodo = models.ForeignKey(MetodoPago, on_delete=models.SET_NULL, null=True, blank=True)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_hora = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=10, choices=ESTADOS)
    codigo_autorizacion = models.CharField(max_length=80, null=True, blank=True)
    referencia_externa = models.CharField(max_length=80, null=True, blank=True)

    def __str__(self):
        return f"Pago {self.id} - {self.estado}"

    class Meta:
        verbose_name = "Pago"
        verbose_name_plural = "Pagos"
        ordering = ["-fecha_hora"]


# ==========================
# 6) WEBHOOK_EVENTO
# ==========================
class WebhookEvento(models.Model):
    pago = models.ForeignKey(Pago, on_delete=models.CASCADE)
    tipo_evento = models.CharField(max_length=60)
    payload = models.JSONField()
    fecha_recepcion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Evento {self.tipo_evento} - Pago {self.pago.id}"

    class Meta:
        verbose_name = "Evento de Webhook"
        verbose_name_plural = "Eventos de Webhook"
        ordering = ["-fecha_recepcion"]


# ==========================
# 7) NOTIFICACION
# ==========================
class Notificacion(models.Model):
    # ⬇️ NUEVO: vincular siempre la notificación a quién va dirigida
    suscripcion = models.ForeignKey('Suscripcion', on_delete=models.CASCADE, related_name='notificaciones', null=True, blank=True)
    CANALES = [
        ('CORREO', 'Correo'),
    ]
    ESTADOS = [
        ('PENDIENTE', 'Pendiente'),
        ('ENVIADA', 'Enviada'),
        ('FALLIDA', 'Fallida'),
    ]

    pago = models.ForeignKey(Pago, on_delete=models.SET_NULL, null=True, blank=True)
    canal = models.CharField(max_length=10, choices=CANALES, default='CORREO')
    asunto = models.CharField(max_length=120)
    cuerpo = models.TextField()
    estado_envio = models.CharField(max_length=10, choices=ESTADOS, default='PENDIENTE')
    fecha_envio = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Notif {self.id} - {self.estado_envio}"

    class Meta:
        verbose_name = "Notificación"
        verbose_name_plural = "Notificaciones"
        ordering = ["-fecha_envio", "-id"]
