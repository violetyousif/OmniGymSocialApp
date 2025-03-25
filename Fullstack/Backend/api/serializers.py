from rest_framework import serializers
from .models import Item
from .models import User

# PURPOSE: This tells Django REST Framework how to convert the Item model to JSON and back.
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


# PURPOSE: Serializes the User model for registration and login
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'birthdate', 'phone_number', 'membership_id', 'gym_abbr', 'gym_city', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user
