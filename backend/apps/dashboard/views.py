from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.farms.models import Farm
from apps.detections.models import Detection
from apps.sensors.models import SensorData
from apps.alerts.models import Alert
from apps.alerts.serializers import AlertSerializer
from apps.sensors.serializers import SensorDataSerializer


class DashboardView(APIView):
    def get(self, request):
        farms = Farm.objects.filter(owner=request.user)
        farm_ids = farms.values_list('id', flat=True)

        total_chickens = farms.aggregate(total=Sum('total_chickens'))['total'] or 0

        detections = Detection.objects.filter(farm_id__in=farm_ids)
        healthy = detections.filter(status='healthy').count()
        abnormal = detections.filter(status='abnormal').count()

        latest_sensor = SensorData.objects.filter(farm_id__in=farm_ids).first()
        recent_alerts = Alert.objects.filter(
            farm_id__in=farm_ids, is_resolved=False
        )[:10]

        return Response({
            'total_chickens': total_chickens,
            'healthy_chickens': healthy,
            'abnormal_chickens': abnormal,
            'total_detections': healthy + abnormal,
            'farms_count': farms.count(),
            'latest_sensor_data': SensorDataSerializer(latest_sensor).data if latest_sensor else None,
            'recent_alerts': AlertSerializer(recent_alerts, many=True).data,
            'unresolved_alerts_count': Alert.objects.filter(
                farm_id__in=farm_ids, is_resolved=False
            ).count(),
        })
