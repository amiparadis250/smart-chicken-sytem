from django.db import models
from apps.farms.models import Farm
from apps.devices.models import Device

# Threshold constants for alert generation
THRESHOLDS = {
    'temperature_min': 18.0,
    'temperature_max': 35.0,
    'humidity_min': 40.0,
    'humidity_max': 80.0,
    'gas_level_max': 50.0,
}


class SensorData(models.Model):
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='sensor_data')
    device = models.ForeignKey(
        Device, on_delete=models.SET_NULL, null=True, blank=True, related_name='readings'
    )
    temperature = models.FloatField(help_text='Temperature in °C')
    humidity = models.FloatField(help_text='Humidity in %')
    gas_level = models.FloatField(help_text='Gas level in ppm')
    recorded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'sensor_data'
        ordering = ['-recorded_at']
        indexes = [
            models.Index(fields=['farm', '-recorded_at']),
        ]

    def __str__(self):
        return f"Sensor [{self.farm.name}] {self.recorded_at}"

    def check_thresholds(self):
        """Return list of threshold violations."""
        violations = []
        if self.temperature < THRESHOLDS['temperature_min']:
            violations.append(f"Temperature too low: {self.temperature}°C")
        if self.temperature > THRESHOLDS['temperature_max']:
            violations.append(f"Temperature too high: {self.temperature}°C")
        if self.humidity < THRESHOLDS['humidity_min']:
            violations.append(f"Humidity too low: {self.humidity}%")
        if self.humidity > THRESHOLDS['humidity_max']:
            violations.append(f"Humidity too high: {self.humidity}%")
        if self.gas_level > THRESHOLDS['gas_level_max']:
            violations.append(f"Gas level too high: {self.gas_level} ppm")
        return violations
