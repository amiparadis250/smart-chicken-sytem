from django.contrib import admin
from .models import Farm

@admin.register(Farm)
class FarmAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'total_chickens', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('name', 'owner__email')
