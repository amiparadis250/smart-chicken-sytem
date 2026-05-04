from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    path('admin/', admin.site.urls),
    # API docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    # App routes
    path('api/auth/', include('apps.authentication.urls')),
    path('api/farms/', include('apps.farms.urls')),
    path('api/sensors/', include('apps.sensors.urls')),
    path('api/detections/', include('apps.detections.urls')),
    path('api/alerts/', include('apps.alerts.urls')),
    path('api/dashboard/', include('apps.dashboard.urls')),
    path('api/devices/', include('apps.devices.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
