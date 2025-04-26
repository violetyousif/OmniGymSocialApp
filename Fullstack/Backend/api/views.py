# SOLID Principles Applied:
# SRP: Each view has a single responsibility
# OCP: Views can be extended without modification
# LSP: Views can be substituted where needed
# ISP: Each view has a focused interface
# DIP: Views depend on abstractions (serializers/models)

# This file defines the API views for handling frontend requests using real Supabase data.
import requests
from django.conf import settings
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes  # Added for permission classes
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone  # Added to set uploadDate
from .models import AffilGyms, PlanetFitnessDB, LifetimeFitnessDB
from .serializers import LTFUserSerializer, PFUserSerializer
from datetime import datetime
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

# PURPOSE: Control what data gets sent/received and create the views here
from rest_framework import viewsets

# PURPOSE: Handles user registration and login
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .utils import SUPABASE_HEADERS

# PURPOSE: Handles wilks 2 score and PR metrics
from django.utils.timezone import now
from .models import PFUserMetrics  # TODO: Temporary! Rename later to UserMetrics and generalize
import math


# PURPOSE: Handles user login
@api_view(['POST'])
def loginUser(request):
    # SRP: Handles only user login functionality
    # Handles user login and returns a JWT token
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
#
#     if gym_abbr == "PF":
#         serializer = PFUserSerializer(data=request.data)
#     elif gym_abbr == "LTF":
#         serializer = LTFUserSerializer(data=request.data)
#     else:
#         return Response({"error": "Invalid or missing gym input."}, status=status.HTTP_400_BAD_REQUEST)
#
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
#
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

# PURPOSE: Handles user registration with Supabase Auth
@api_view(['POST'])
def registerUser(request):
    # See all frontend data being submitted
    print("Incoming request data:", request.data)

    """Handles user registration + Supabase Auth user creation"""
    gym_abbr = request.data.get("gymAbbr")
    email = request.data.get("email")
    password = request.data.get("password")

    print("Email:", email)
    print("Gym Abbr:", gym_abbr)
    print("Password:", password)

    if not all([email, password]):
        return Response({"error": "Email and password are required."}, status=400)

    # Step 1: Attempt to create user in Supabase Auth
    supabase_response = requests.post(
        f"{settings.SUPABASE_URL}/auth/v1/admin/users",
        headers=SUPABASE_HEADERS,
        json={
            "email": email,
            "password": password,
            "email_confirm": True
        }
    )

    # Print Supabase response status and body
    print("🔐 Supabase Auth response status:", supabase_response.status_code)
    try:
        print("🧾 Supabase Auth JSON:", supabase_response.json())
    except Exception:
        print("❌ Failed to parse Supabase Auth response as JSON")
        print("📄 Raw response text:", supabase_response.text)
        

    # Handle duplicate email or other known client-side error
    if supabase_response.status_code == 400:
        error_data = supabase_response.json()
        message = error_data.get("message", "").lower()
        if "already registered" in message or "duplicate key" in message:
            return Response({"error": "Email is already in use."}, status=409)
        return Response({
            "error": "Invalid request to Supabase Auth.",
            "details": error_data
        }, status=400)

    # Handle unexpected errors
    if supabase_response.status_code not in [200, 201]:
        return Response({
            "error": "Failed to create user in Supabase Auth",
            "details": supabase_response.json()
        }, status=500)


    # Step 2: Save user to local gym user table
    supabase_user_id = supabase_response.json()["id"]
    print("Supabase User ID:", supabase_user_id)

    user_data = request.data.copy()
    user_data = request.data.copy()

    # Convert MM/DD/YYYY to YYYY-MM-DD
    birth_date_str = user_data.get("birthDate")
    if birth_date_str:
        try:
            birth_date_obj = datetime.strptime(birth_date_str, "%m/%d/%Y")
            user_data["birthDate"] = birth_date_obj.strftime("%Y-%m-%d")
        except ValueError:
            print("Invalid date format: Please use MM/DD/YYYY")
            return Response({"error": "Invalid birthDate format. Use MM/DD/YYYY."}, status=400)

    user_data["auth_user_id"] = supabase_user_id
    print("Final user_data passed to serializer:", user_data)

    if gym_abbr == "PF":
        serializer = PFUserSerializer(data=user_data)
    elif gym_abbr == "LTF":
        serializer = LTFUserSerializer(data=user_data)
    else:
        return Response({"error": "Invalid or missing gym input."}, status=400)

    if serializer.is_valid():
        serializer.save()
        print("User successfully saved to database.")
        return Response({"message": "User registered successfully!"}, status=201)

    print("Serializer errors:", serializer.errors)
    return Response(serializer.errors, status=400)



# PURPOSE: Verify membership for specific gym during registration
@api_view(["POST"])
def verifyMembership(request):
    data = request.data
    gym_name = data.get("gymName")
    member_id = data.get("memberID")

    if not gym_name or not member_id:
        return Response({"error": "Gym name and member ID are required."}, status=400)

    # Step 1: Look up gym name in AffilGyms table
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

# PURPOSE: Get gym cities based on gym name and state
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



# PURPOSE: Handles user logout
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




# PURPOSE: Update Wilks score for a user 
# TODO: change so it's not PF specific afterwards
# Brzycki formula for estimating 1-rep max
def estimatePR(weight, reps):
    return weight * (36 / (37 - reps)) if weight and reps else None

# Wilks coefficients (latest 2020 coefficients)
COEFFICIENTS = {
    'male': [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-06, -1.291e-08],
    'female': [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582e-05, -9.054e-08]
}

def calculateWilks(memberWeight, gender, totalLift):
    gender = gender.lower()
    if gender not in COEFFICIENTS or not memberWeight:
        return None
    
    a, b, c, d, e, f = COEFFICIENTS[gender]
    denom = a + b * memberWeight + c * memberWeight**2 + d * memberWeight**3 + e * memberWeight**4 + f * memberWeight**5

    if denom == 0:
        return None
    return round(500 * totalLift / denom, 2)

@api_view(['POST'])
def updateWilksScore(request):
    user_id = request.data.get('user_id')
    if not user_id:
        return Response({'error': 'user_id is required'}, status=400)

    try:
        userMetrics = PFUserMetrics.objects.get(auth_user_id=user_id)

        lifts = []
        for lift in ['prBenchWeight', 'prDeadliftWeight', 'prSquatWeight']:
            weight = getattr(userMetrics, lift)
            reps = getattr(userMetrics, lift.replace('Weight', 'Reps')) or 1
            if weight:
                lifts.append(estimatePR(weight, reps))

        if len(lifts) < 3 or not userMetrics.memberWeight or not userMetrics.gender:
            return Response({'message': 'Missing data for Wilks calculation.'}, status=400)

        totalPR = sum(lifts)
        wilks = calculateWilks(userMetrics.memberWeight, userMetrics.gender, totalPR)
        userMetrics.wilks2Score = wilks
        userMetrics.save()

        return Response({'wilksScore': wilks}, status=200)

    except PFUserMetrics.DoesNotExist:
        return Response({'error': 'User metrics not found.'}, status=404)
