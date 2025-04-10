# SOLID Principles Applied:
# SRP: Each view has a single responsibility
# OCP: Views can be extended without modification
# LSP: Views can be substituted where needed
# ISP: Each view has a focused interface
# DIP: Views depend on abstractions (serializers/models)

# This file defines the API views for handling frontend requests using real Supabase data.

from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone  # Added to set uploadDate
# from .models.pf_models import PFUsers, PlanetFitnessDB  # PFUsers model
# from .models.ltf_models import LTFUsers, LifetimeFitnessDB
from .models import AffilGyms, PlanetFitnessDB, LifetimeFitnessDB
# from .models.globalOps_models import AffilGyms
from .serializers import LTFUserSerializer, PFUserSerializer

# PURPOSE: Control what data gets sent/received and create the views here
from rest_framework import viewsets
# from .models import Item
# from .serializers import ItemSerializer

# PURPOSE: Handles user registration and login
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
# from .models import User

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


# PURPOSE: Handles user registration
@api_view(['POST'])
def registerUser(request):
    """SRP: Handles only user registration
    OCP: Can be extended for new gym types
    DIP: Uses serializer abstractions"""
    """Handles user registration for PF or LTF users based on gymAbbr"""
    gym_abbr = request.data.get("gymAbbr")

    if gym_abbr == "PF":
        serializer = PFUserSerializer(data=request.data)
    elif gym_abbr == "LTF":
        serializer = LTFUserSerializer(data=request.data)
    else:
        return Response({"error": "Invalid or missing gymAbbr. Must be 'PF' or 'LTF'."}, status=status.HTTP_400_BAD_REQUEST)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)

    print("Serializer errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def registerUser(request):
#     """Handles user registration"""
#     serializer = UserSerializer(data=request.data)  # Ensure UserSerializer is imported

#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    gym_city = data.get("gymCity")
    gym_state = data.get("gymState")

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
        gymCity__iexact=gym_city,
        memberID__iexact=member_id,
        gymAbbr__iexact=gym_abbr,
        gymState__iexact=gym_state
    ).first()

    if not user:
        print(f"Member not found with ID: {member_id}, gymAbbr: {gym_abbr}, city: {gym_city}, state: {gym_state}")
        return Response({"error": "Member not found."}, status=404)

    if not user:
        return Response({"error": "Member not found."}, status=404)

    # Validated user
    return Response({
        "valid": True,
        "gymAbbr": gym_abbr,
        "gymCity": gym_city,
        "gymState": gym_state,
        "firstName": user.firstName,
        "lastName": user.lastName
    }, status=200)


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