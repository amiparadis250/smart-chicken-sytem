from django.db import models
from apps.farms.models import Farm


class Alert(models.Model):
    class Severity(models.TextChoices):
        LOW = 'low', 'Low'
        MEDIUM = 'medium', 'Medium'
        HIGH = 'high', 'High'
        CRITICAL = 'critical', 'Critical'

    class AlertType(models.TextChoices):
        SENSOR = 'sensor', 'Sensor'
        AI = 'ai', 'AI Detection'

    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='alerts')
    alert_type = models.CharField(max_length=10, choices=AlertType.choices)
    severity = models.CharField(max_length=10, choices=Severity.choices)
    message = models.TextField()
    is_resolved = models.BooleanField(default=False)
    sensor_data = models.ForeignKey(
        'sensors.SensorData', on_delete=models.SET_NULL,
        null=True, blank=True, related_name='alerts'
    )
    detection = models.ForeignKey(
        'detections.Detection', on_delete=models.SET_NULL,
        null=True, blank=True, related_name='alerts'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'alerts'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['farm', '-created_at']),
            models.Index(fields=['severity']),
            models.Index(fields=['is_resolved']),
        ]

    def __str__(self):
        return f"[{self.severity}] {self.alert_type} - {self.farm.name}"
