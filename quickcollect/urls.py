from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import (
    UsuarioViewSet, PlanViewSet, SuscripcionViewSet, MetodoPagoViewSet,
    PagoViewSet, WebhookEventoViewSet, NotificacionViewSet, DashboardResumenAPIView, HealthAPIView
)

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'planes', PlanViewSet)
router.register(r'suscripciones', SuscripcionViewSet)
router.register(r'metodos', MetodoPagoViewSet)
router.register(r'pagos', PagoViewSet)
router.register(r'webhooks', WebhookEventoViewSet)
router.register(r'notificaciones', NotificacionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/dashboard/resumen/', DashboardResumenAPIView.as_view(), name='dashboard-resumen'),
    path('api/health/', HealthAPIView.as_view(), name='health'),
]
