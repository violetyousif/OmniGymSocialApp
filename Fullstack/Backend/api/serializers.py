# api/serializers.py

from rest_framework import serializers
from .models import PFUser  # ✅ Planet Fitness User model (already connected to Supabase)

# PURPOSE: Serializes PFUser model (Planet Fitness users) for reading/writing to Supabase
class PFUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PFUser
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}  # 🔒 Hide password in API responses
        }

    def validate_email(self, value):
        # ✅ Validate proper email formatting
        if '@' not in value or '.' not in value:
            raise serializers.ValidationError("Enter a valid email address.")
        return value

    def validate_password(self, value):
        # ✅ Enforce strong password requirements
        if len(value) < 10 \
           or not any(c.isupper() for c in value) \
           or not any(c.islower() for c in value) \
           or not any(c.isdigit() for c in value) \
           or not any(not c.isalnum() for c in value):
            raise serializers.ValidationError(
                "Password must be at least 10 characters and include uppercase, lowercase, number, and symbol."
            )
        return value
