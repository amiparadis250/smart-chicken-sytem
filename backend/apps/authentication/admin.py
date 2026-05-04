from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'first_name', 'is_farmer', 'is_active')
    list_filter = ('is_farmer', 'is_active')
    search_fields = ('email', 'username')
    ordering = ('-created_at',)
