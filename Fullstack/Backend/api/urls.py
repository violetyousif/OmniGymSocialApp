# PURPOSE: This is where we define the URL routing for our Django application (route requests to the appropriate views)

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet


# Import views for user registration and login
from .views import register_user, login_user
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'items', ItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]