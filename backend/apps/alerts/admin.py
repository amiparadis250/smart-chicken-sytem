from django.contrib import admin
from .models import Alert

@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ('farm', 'alert_type', 'severity', 'is_resolved', 'created_at')
    list_filter = ('alert_type', 'severity', 'is_resolved')
    ordering = ('-created_at',)
