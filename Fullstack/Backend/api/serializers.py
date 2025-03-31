# api/serializers.py

from rest_framework import serializers
from .models.pf_models import PFUsers
from .models.ltf_models import LTFUsers
# from .models import User
# from .models import Item


#PURPOSE: This tells Django REST Framework how to convert the Item Model to JSON and back
# class ItemSerializer(serializers.ModelSerializer):
#     model = Item
#     fields = '__all__'

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



class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}  # Hide password in API responses
        }

    def __init__(self, *args, **kwargs):
        # Dynamically set the model based on the provided 'user_type'
        user_type = kwargs.pop('user_type', None)
        super().__init__(*args, **kwargs)
        if user_type == 'PF':
            self.Meta.model = PFUsers
        elif user_type == 'LTF':
            self.Meta.model = LTFUsers
        else:
            raise ValueError("Invalid user_type. Must be 'PF' or 'LTF'.")

    def validate_email(self, value):
        # Validate proper email formatting
        if '@' not in value or '.' not in value:
            raise serializers.ValidationError("Enter a valid email address.")
        return value

    def validate_password(self, value):
        # Enforce strong password requirements
        if len(value) < 8 \
           or not any(c.isupper() for c in value) \
           or not any(c.islower() for c in value) \
           or not any(c.isdigit() for c in value) \
           or not any(not c.isalnum() for c in value):
            raise serializers.ValidationError(
                "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
            )
        return value

# PURPOSE: Serializes PFUsers model (Planet Fitness users) for reading/writing to Supabase
# class PFUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PFUsers
#         fields = '__all__'
#         extra_kwargs = {
#             'password': {'write_only': True}  # Hide password in API responses
#         }

#     def validate_email(self, value):
#         # Validate proper email formatting
#         if '@' not in value or '.' not in value:
#             raise serializers.ValidationError("Enter a valid email address.")
#         return value

#     def validate_password(self, value):
#         # Enforce strong password requirements
#         if len(value) < 8 \
#            or not any(c.isupper() for c in value) \
#            or not any(c.islower() for c in value) \
#            or not any(c.isdigit() for c in value) \
#            or not any(not c.isalnum() for c in value):
#             raise serializers.ValidationError(
#                 "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
#             )
#         return value
