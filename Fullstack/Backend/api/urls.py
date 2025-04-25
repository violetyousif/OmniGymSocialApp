# PURPOSE: This is where we define the URL routing for our Django application (route requests to the appropriate views)

from django.urls import path, include
# from .views import register_pf_user, list_pf_users  # Updated to import correct view functions
from rest_framework_simplejwt.views import TokenRefreshView

# Import views for user registration and login
# from .views import ItemViewSet
from .views import registerUser, loginUser, verifyMembership, getGymCities, getGymStates
from rest_framework.routers import DefaultRouter
from .views import updateWilksScore

router = DefaultRouter()
# router.register(r'items', ItemViewSet)

urlpatterns = [
    #Violets
    path('', include(router.urls)),
    path('register/', registerUser, name='register'),
    path('login/', loginUser, name='login'),
    path("verifyMembership/", verifyMembership),
    path("getGymCities/", getGymCities),
    path("getGymStates/", getGymStates),
    path('updateWilksScore/', updateWilksScore, name='update_wilks'),
    
    #Klimans
    # path('register-pf-user/', register_pf_user, name='register_pf_user'),
    # path('list-pf-users/', list_pf_users, name='list_pf_users'),  # Optional: useful for testing
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]