# This file defines the API views for handling frontend requests using real Supabase data.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone  # ✅ Added to set uploadDate
from .models.pf_models import PFUser  # ✅ PFUsers model
from .models import PlanetFitnessDB   # ✅ PlanetFitnessDB now correctly imported
from .serializers import PFUserSerializer

@api_view(['POST'])
def register_pf_user(request):
    """
    Handles POST requests to register a new PFUser into the Supabase PFUsers table.
    """
    data = request.data

    # Step 1: Ensure PlanetFitnessDB has this member first (FK requirement)
    member_exists = PlanetFitnessDB.objects.filter(
        memberID=data.get('memberID'),
        gymAbbr=data.get('gymAbbr'),
        gymCity=data.get('gymCity'),
        gymState=data.get('gymState')
    ).exists()

    if not member_exists:
        # Create the minimal matching record in PlanetFitnessDB
        PlanetFitnessDB.objects.create(
            memberID=data.get('memberID'),
            gymAbbr=data.get('gymAbbr'),
            gymCity=data.get('gymCity'),
            gymState=data.get('gymState'),
            firstName=data.get('firstName'),
            lastName=data.get('lastName'),
            uploadDate=timezone.now()  # ✅ Fix: Add missing timestamp
        )

    # Step 2: Proceed with inserting into PFUsers
    serializer = PFUserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "PFUser created successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def list_pf_users(request):
    """
    Returns a list of all Planet Fitness users in the PFUsers table.
    """
    users = PFUser.objects.all()
    serializer = PFUserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
