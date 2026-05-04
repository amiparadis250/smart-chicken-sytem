from rest_framework import serializers
from .models import Alert


class AlertSerializer(serializers.ModelSerializer):
    farm_name = serializers.ReadOnlyField(source='farm.name')

    class Meta:
        model = Alert
        fields = ('id', 'farm', 'farm_name', 'alert_type', 'severity',
                  'message', 'is_resolved', 'sensor_data', 'detection',
                  'created_at')
        read_only_fields = ('id', 'created_at')
