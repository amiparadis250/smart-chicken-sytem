from django.db import models
from apps.farms.models import Farm
from apps.devices.models import Device


class Detection(models.Model):
    class Status(models.TextChoices):
        HEALTHY = 'healthy', 'Healthy'
        ABNORMAL = 'abnormal', 'Abnormal'

    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='detections')
    device = models.ForeignKey(
        Device, on_delete=models.SET_NULL, null=True, blank=True, related_name='detections'
    )
    image = models.ImageField(upload_to='detections/%Y/%m/%d/')
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.HEALTHY)
    confidence = models.FloatField(help_text='AI confidence score 0-1')
    notes = models.TextField(blank=True)
    detected_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'detections'
        ordering = ['-detected_at']
        indexes = [
            models.Index(fields=['farm', '-detected_at']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.status} ({self.confidence:.0%}) - {self.farm.name}"
