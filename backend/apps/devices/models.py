from django.db import models
from apps.farms.models import Farm


class Device(models.Model):
    class DeviceType(models.TextChoices):
        CAMERA = 'camera', 'Camera'
        SENSOR = 'sensor', 'Sensor'

    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='devices')
    name = models.CharField(max_length=255)
    device_type = models.CharField(max_length=10, choices=DeviceType.choices)
    serial_number = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    last_ping = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'devices'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['farm']),
            models.Index(fields=['device_type']),
        ]

    def __str__(self):
        return f"{self.name} ({self.device_type})"
