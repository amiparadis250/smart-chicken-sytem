from rest_framework import serializers
from .models import Device


class DeviceSerializer(serializers.ModelSerializer):
    farm_name = serializers.ReadOnlyField(source='farm.name')

    class Meta:
        model = Device
        fields = ('id', 'farm', 'farm_name', 'name', 'device_type',
                  'serial_number', 'is_active', 'last_ping',
                  'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')
