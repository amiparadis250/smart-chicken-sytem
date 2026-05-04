from django.contrib import admin
from .models import SensorData

@admin.register(SensorData)
class SensorDataAdmin(admin.ModelAdmin):
    list_display = ('farm', 'temperature', 'humidity', 'gas_level', 'recorded_at')
    list_filter = ('farm',)
    ordering = ('-recorded_at',)
