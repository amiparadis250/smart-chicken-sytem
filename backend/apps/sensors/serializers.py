from rest_framework import serializers
from .models import SensorData


class SensorDataSerializer(serializers.ModelSerializer):
    farm_name = serializers.ReadOnlyField(source='farm.name')
    violations = serializers.SerializerMethodField()

    class Meta:
        model = SensorData
        fields = ('id', 'farm', 'farm_name', 'device', 'temperature',
                  'humidity', 'gas_level', 'recorded_at', 'violations')
        read_only_fields = ('id', 'recorded_at', 'violations')

    def get_violations(self, obj):
        return obj.check_thresholds()
