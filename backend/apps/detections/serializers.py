from rest_framework import serializers
from .models import Detection


class DetectionSerializer(serializers.ModelSerializer):
    farm_name = serializers.ReadOnlyField(source='farm.name')

    class Meta:
        model = Detection
        fields = ('id', 'farm', 'farm_name', 'device', 'image', 'status',
                  'confidence', 'notes', 'detected_at')
        read_only_fields = ('id', 'detected_at')
