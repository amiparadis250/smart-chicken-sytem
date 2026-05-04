from rest_framework import viewsets
from .models import Device
from .serializers import DeviceSerializer


class DeviceViewSet(viewsets.ModelViewSet):
    serializer_class = DeviceSerializer
    filterset_fields = ['farm', 'device_type', 'is_active']

    def get_queryset(self):
        return Device.objects.filter(farm__owner=self.request.user)
