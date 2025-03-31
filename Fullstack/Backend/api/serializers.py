# api/serializers.py

from rest_framework import serializers
from .models import PFUser  # ✅ Planet Fitness User model (already connected to Supabase)
from .models import User
from .models import Item


#PURPOSE: This tells Django REST Framework how to convert the Item Model to JSON and back
class ItemSerializer(serializers.ModelSerializer):
    model = Item
    fields = '__all__'

# PURPOSE: Serializes the User model for registration and login
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # Hide password in API responses
        }
    def create(self, validated_data):
        # Create a new user instance and set the password
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user





# PURPOSE: Serializes PFUser model (Planet Fitness users) for reading/writing to Supabase
class PFUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PFUser
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}  # Hide password in API responses
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
                "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
            )
        return value
