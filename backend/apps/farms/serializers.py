from rest_framework import serializers
from .models import Farm


class FarmSerializer(serializers.ModelSerializer):
    owner_email = serializers.ReadOnlyField(source='owner.email')

    class Meta:
        model = Farm
        fields = ('id', 'owner', 'owner_email', 'name', 'location',
                  'total_chickens', 'description', 'is_active',
                  'created_at', 'updated_at')
        read_only_fields = ('id', 'owner', 'created_at', 'updated_at')
