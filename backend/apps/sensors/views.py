from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import SensorData
from .serializers import SensorDataSerializer


class SensorDataViewSet(viewsets.ModelViewSet):
    serializer_class = SensorDataSerializer
    filterset_fields = ['farm', 'device']
    http_method_names = ['get', 'post', 'head']

    def get_queryset(self):
        return SensorData.objects.filter(farm__owner=self.request.user)

    def perform_create(self, serializer):
        sensor_data = serializer.save()
        # Auto-generate alerts for threshold violations
        violations = sensor_data.check_thresholds()
        if violations:
            from apps.alerts.models import Alert
            for violation in violations:
                Alert.objects.create(
                    farm=sensor_data.farm,
                    alert_type='sensor',
                    severity='high' if 'Gas' in violation else 'medium',
                    message=violation,
                    sensor_data=sensor_data,
                )
