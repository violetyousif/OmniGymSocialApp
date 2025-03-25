from django.shortcuts import render

# PURPOSE: Control what data gets sent/received and create the views here
from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer

# PURPOSE: Handles user registration and login

from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import User
from .serializers import UserSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    @api_view(['POST'])
    def register_user(request):
        """Handles user registration"""
        serializer = UserSerializer(data=request.data)  # Ensure UserSerializer is imported

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['POST'])
    def login_user(request):
        """Handles user login and returns a JWT token"""
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful!",
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
            }, status=status.HTTP_200_OK)

        return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)