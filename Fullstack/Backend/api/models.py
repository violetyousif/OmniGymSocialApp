from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.utils import timezone

# PURPOSE: Defines and creates the data structure models


class Item(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.name


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a regular user with an email and password."""
        if not email:
            raise ValueError(_("The Email field is required"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Hash password before saving
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a superuser with admin privileges."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True or extra_fields.get('is_superuser') is not True:
            raise ValueError(_("Superuser must have is_staff=True and is_superuser=True."))

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """Custom User model with gym-related fields."""

    # Required fields
    email = models.EmailField(unique=True, max_length=255)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    birthdate = models.DateField()

    # Phone number validation: must be in format XXX-XXX-XXXX
    phone_number = models.CharField(
        max_length=12,
        validators=[RegexValidator(r'^\d{3}-\d{3}-\d{4}$', message="Phone number must be in the format XXX-XXX-XXXX.")]
    )

    # Gym-related fields
    gym_abbr = models.CharField(max_length=3)
    gym_city = models.CharField(max_length=20)
    membership_id = models.CharField(max_length=15, unique=True)

    # Security & Account status
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    # Define custom manager
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'birthdate', 'phone_number', 'membership_id', 'gym_abbr', 'gym_city']

    def __str__(self):
        """String representation of the user."""
        return f"{self.first_name} {self.last_name} - {self.email.lower()}"

    def clean(self):
        """Additional validations"""
        if self.birthdate >= timezone.now().date():
            raise ValidationError(_("Birthdate must be in the past."))


# ✅ Represents the PlanetFitnessDB table (used as a foreign key source for PFUsers)
class PlanetFitnessDB(models.Model):
    databaseID = models.AutoField(primary_key=True)
    gymCity = models.CharField(max_length=255)
    gymAbbr = models.CharField(max_length=10)
    memberID = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    firstName = models.CharField(max_length=255)
    uploadDate = models.DateTimeField(auto_now_add=True)
    gymState = models.CharField(max_length=255)

    class Meta:
        db_table = 'PlanetFitnessDB'  # Match the exact table name in Supabase
        managed = False  # ⚠️ Prevent Django from modifying this Supabase-managed table
