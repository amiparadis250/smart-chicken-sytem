from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Alert
from .serializers import AlertSerializer


class AlertViewSet(viewsets.ModelViewSet):
    serializer_class = AlertSerializer
    filterset_fields = ['farm', 'alert_type', 'severity', 'is_resolved']
    http_method_names = ['get', 'patch', 'head']

    def get_queryset(self):
        return Alert.objects.filter(farm__owner=self.request.user)

    @action(detail=True, methods=['patch'], url_path='resolve')
    def resolve(self, request, pk=None):
        alert = self.get_object()
        alert.is_resolved = True
        alert.save(update_fields=['is_resolved'])
        return Response(AlertSerializer(alert).data)
