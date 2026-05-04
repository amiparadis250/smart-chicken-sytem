from django.db import models
from django.conf import settings


class Farm(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='farms'
    )
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    total_chickens = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'farms'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['owner']),
        ]

    def __str__(self):
        return f"{self.name} ({self.owner.email})"
