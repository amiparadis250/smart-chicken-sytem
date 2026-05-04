import cv2
import numpy as np
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Detection
from .serializers import DetectionSerializer


def run_ai_analysis(image_path):
    """
    OpenCV integration hook.
    Replace this with your trained model inference logic.
    Currently returns a placeholder result.
    """
    img = cv2.imread(image_path)
    if img is None:
        return {'status': 'healthy', 'confidence': 0.0}
    # Placeholder: replace with actual model prediction
    return {'status': 'healthy', 'confidence': 0.95}


class DetectionViewSet(viewsets.ModelViewSet):
    serializer_class = DetectionSerializer
    filterset_fields = ['farm', 'status']

    def get_queryset(self):
        return Detection.objects.filter(farm__owner=self.request.user)

    def perform_create(self, serializer):
        detection = serializer.save()
        # Auto-generate alert if abnormal
        if detection.status == Detection.Status.ABNORMAL:
            from apps.alerts.models import Alert
            Alert.objects.create(
                farm=detection.farm,
                alert_type='ai',
                severity='critical' if detection.confidence > 0.8 else 'high',
                message=f"Abnormal chicken detected (confidence: {detection.confidence:.0%})",
                detection=detection,
            )

    @action(detail=False, methods=['post'], url_path='analyze')
    def analyze_image(self, request):
        """Upload an image for AI analysis via OpenCV."""
        farm_id = request.data.get('farm')
        image = request.FILES.get('image')
        if not farm_id or not image:
            return Response(
                {'error': 'farm and image are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        detection = Detection.objects.create(
            farm_id=farm_id,
            device_id=request.data.get('device'),
            image=image,
            status='healthy',
            confidence=0.0,
        )
        # Run OpenCV analysis
        result = run_ai_analysis(detection.image.path)
        detection.status = result['status']
        detection.confidence = result['confidence']
        detection.save()

        if detection.status == Detection.Status.ABNORMAL:
            from apps.alerts.models import Alert
            Alert.objects.create(
                farm=detection.farm,
                alert_type='ai',
                severity='critical' if detection.confidence > 0.8 else 'high',
                message=f"Abnormal chicken detected (confidence: {detection.confidence:.0%})",
                detection=detection,
            )

        return Response(DetectionSerializer(detection).data, status=status.HTTP_201_CREATED)
