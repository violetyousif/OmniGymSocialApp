# SOLID Principles Applied:
# SRP: Each view has a single responsibility
# OCP: Views can be extended without modification
# LSP: Views can be substituted where needed
# ISP: Each view has a focused interface
# DIP: Views depend on abstractions (serializers/models)

# This file defines the API views for handling frontend requests using real Supabase data.

from django.conf import settings
from django.shortcuts import render

import requests
from rest_framework.decorators import api_view, permission_classes  # Added for permission classes
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone  # Added to set uploadDate
from .models import AffilGyms, PlanetFitnessDB, LifetimeFitnessDB
from .serializers import LTFUserSerializer, PFUserSerializer

# PURPOSE: Control what data gets sent/received and create the views here
from rest_framework import viewsets

# PURPOSE: Handles user registration and login
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .utils import SUPABASE_HEADERS, check_supabase_user_exists

# PURPOSE: Handles user registration and login
# from django.http import JsonResponse
# from .models import AffilGyms, PlanetFitnessDB, LifetimeFitnessDB
# from django.views.decorators.csrf import csrf_exempt
# from django.http import JsonResponse
# # from supabase import create_client
# from .models import PFUsers, LifetimeFitnessDB, LTFUsers, PlanetFitnessDB

# class ItemViewSet(viewsets.ModelViewSet):
#     queryset = Item.objects.all()
#     serializer_class = ItemSerializer


# PURPOSE: Handles user login
@api_view(['POST'])
def loginUser(request):
    """SRP: Handles only user login functionality
    DIP: Depends on authentication abstraction"""
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


### ATTEMPT 1; PURPOSE: Handles user registration
# @api_view(['POST'])
# def registerUser(request):
#     """SRP: Handles only user registration
#     OCP: Can be extended for new gym types
#     DIP: Uses serializer abstractions"""
#     """Handles user registration for PF or LTF users based on gymAbbr"""
#     gym_abbr = request.data.get("gymAbbr")

#     if gym_abbr == "PF":
#         serializer = PFUserSerializer(data=request.data)
#     elif gym_abbr == "LTF":
#         serializer = LTFUserSerializer(data=request.data)
#     else:
#         return Response({"error": "Invalid or missing gym input."}, status=status.HTTP_400_BAD_REQUEST)

#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)

#     print("Serializer errors:", serializer.errors)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

### ATTEMPT 2; PURPOSE: Handles user registration with Supabase Auth
# @api_view(['POST'])
# def registerUser(request):
#     """Handles user registration + Supabase Auth user creation"""
#     gym_abbr = request.data.get("gymAbbr")
#     email = request.data.get("email")
#     password = request.data.get("password")
#
#     if not all([email, password]):
#         return Response({"error": "Email and password are required."}, status=400)
#
#     # Step 1: Create Supabase Auth user
#     supabase_response = requests.post(
#         f"{settings.SUPABASE_URL}/auth/v1/admin/users",
#         headers={
#             "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
#             "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
#             "Content-Type": "application/json"
#         },
#         json={
#             "email": email,
#             "password": password,
#             "email_confirm": True
#         }
#     )
#
#     if supabase_response.status_code not in [200, 201]:
#         return Response({
#             "error": "Failed to create user in Supabase Auth",
#             "details": supabase_response.json()
#         }, status=500)
#     # if supabase_response.status_code != 200:
#     #     return Response({
#     #         "error": "Failed to create user in Supabase Auth",
#     #         "details": supabase_response.json()
#     #     }, status=500)
#
#     supabase_user_id = supabase_response.json()["user"]["id"]
#
#     # Step 2: Proceed with your regular serializer
#     user_data = request.data.copy()
#     user_data["auth_user_id"] = supabase_user_id
#
#     if gym_abbr == "PF":
#         serializer = PFUserSerializer(data=user_data)
#     elif gym_abbr == "LTF":
#         serializer = LTFUserSerializer(data=user_data)
#     else:
#         return Response({"error": "Invalid or missing gym input."}, status=400)
#
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "User registered successfully!"}, status=201)
#
#     return Response(serializer.errors, status=400)



# PURPOSE: Verify membership for specific gym during registration
@api_view(["POST"])
def verifyMembership(request):
    data = request.data
    gym_name = data.get("gymName")
    member_id = data.get("memberID")

    if not gym_name or not member_id:
        return Response({"error": "Gym name and member ID are required."}, status=400)

    # Step 1: Look up gym name in AffilGyms table
    # gym = AffilGyms.objects.filter(gymName=gym_name).first()
    gym = AffilGyms.objects.filter(gymName=gym_name).first()
    print("Matched gyms:", gym)

    if not gym:
        return Response({"error": "Unable to locate gym."}, status=404)

    
    gym_abbr = gym.gymAbbr
    gym_state = data.get("gymState")
    gym_city = data.get("gymCity")

    # Step 2: Locate necessary gym DB
    db_map = {
        "PF": PlanetFitnessDB,
        "LTF": LifetimeFitnessDB
    }

    GymTable = db_map.get(gym_abbr)
    if not GymTable:
        return Response({"error": "Unsupported gym type."}, status=400)

    # Step 3: Check if user exists
    # Using iexact to allow case-insensitive matching
    user = GymTable.objects.filter(
        gymAbbr__iexact=gym_abbr,
        gymState__iexact=gym_state,
        gymCity__iexact=gym_city,
        memberID__iexact=member_id
    ).first()

    if not user:
        print(f"Member not found with gymAbbr: {gym_abbr}, state: {gym_state}, city: {gym_city}, ID: {member_id}")
        return Response({"error": "Member not found."}, status=404)

    if not user:
        return Response({"error": "Member not found."}, status=404)

    # Validated user
    from html import escape
    return Response({
        "valid": True,
        "gymAbbr": escape(gym_abbr),
        "gymState": escape(gym_state),
        "gymCity": escape(gym_city),
        "firstName": escape(user.firstName),
        "lastName": escape(user.lastName)
    }, status=200)


# PURPOSE: Get gym states based on gym name
@api_view(["GET"])
def getGymStates(request):
    gym_name = request.query_params.get("gymName")

    if not gym_name:
        return Response({"error": "Missing gym name"}, status=400)

    states = (
        AffilGyms.objects
        .filter(gymName=gym_name)
        .values_list("gymState", flat=True)
        .distinct()
    )

    return Response({"states": list(states)}, status=200)


@api_view(["GET"])
def getGymCities(request):
    gym_name = request.query_params.get("gymName")
    gym_state = request.query_params.get("gymState")

    if not gym_name or not gym_state:
        return Response({"error": "Missing gym name or state"}, status=400)

    cities = (
        AffilGyms.objects
        .filter(gymName=gym_name, gymState=gym_state)
        .values_list("gymCity", flat=True)
        .distinct()
    )
    
    return Response({"cities": list(cities)}, status=200)



from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logoutUser(request):
    try:
        tokens = OutstandingToken.objects.filter(user=request.user)
        for token in tokens:
            BlacklistedToken.objects.get_or_create(token=token)
        return Response({"message": "User logged out from all sessions."}, status=200)
    except:
        return Response({"error": "Failed to log out."}, status=400)




# @api_view(['POST'])
# def registerUser(request):
#     """Handles user registration"""
#     serializer = UserSerializer(data=request.data)  # Ensure UserSerializer is imported

#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# PURPOSE: Get gym cities based on gym name
# @api_view(["GET"])
# def getGymCities(request):
#     gym_name = request.query_params.get("gymName")

#     if not gym_name:
#         return Response({"error": "Missing gym name"}, status=400)

#     cities = (
#         AffilGyms.objects
#         .filter(gymName=gym_name)
#         .values_list("gymCity", flat=True)
#         .distinct()
#     )
    
#     return Response({"cities": list(cities)}, status=200)




# @api_view(['POST'])
# def register_pf_user(request):
#     """
#     Handles POST requests to register a new PFUser into the Supabase PFUsers table.
#     """
#     data = request.data

#     # Step 1: Ensure PlanetFitnessDB has this member first (FK requirement)
#     member_exists = PlanetFitnessDB.objects.filter(
#         memberID=data.get('memberID'),
#         gymAbbr=data.get('gymAbbr'),
#         gymCity=data.get('gymCity'),
#         gymState=data.get('gymState')
#     ).exists()

#     if not member_exists:
#         # Create the minimal matching record in PlanetFitnessDB
#         PlanetFitnessDB.objects.create(
#             memberID=data.get('memberID'),
#             gymAbbr=data.get('gymAbbr'),
#             gymCity=data.get('gymCity'),
#             gymState=data.get('gymState'),
#             firstName=data.get('firstName'),
#             lastName=data.get('lastName'),
#             uploadDate=timezone.now()
#         )

#     # Step 2: Proceed with inserting into PFUsers
#     serializer = PFUserSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "PFUser created successfully!"}, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def list_pf_users(request):
#     """
#     Returns a list of all Planet Fitness users in the PFUsers table.
#     """
#     users = PFUser.objects.all()
#     serializer = PFUserSerializer(users, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)