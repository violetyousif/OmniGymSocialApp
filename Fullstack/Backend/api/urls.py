# api/urls.py

from django.urls import path
from .views import register_pf_user, list_pf_users  # ✅ Updated to import correct view functions
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register-pf-user/', register_pf_user, name='register_pf_user'),
    path('list-pf-users/', list_pf_users, name='list_pf_users'),  # Optional: useful for testing
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
