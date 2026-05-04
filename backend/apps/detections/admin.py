from django.contrib import admin
from .models import Detection

@admin.register(Detection)
class DetectionAdmin(admin.ModelAdmin):
    list_display = ('farm', 'status', 'confidence', 'detected_at')
    list_filter = ('status',)
    ordering = ('-detected_at',)
