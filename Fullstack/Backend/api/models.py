from django.db import models
from django.utils.translation import gettext_lazy as _

# PURPOSE: Defines and creates the data structure models for each table

class AffilGyms(models.Model):
    # SRP: This class has a single responsibility - representing affiliated gyms
    # and their properties. It doesn't handle user management or other concerns.
    gymID = models.BigAutoField(primary_key=True)
    gymName = models.CharField(max_length=255)
    gymCity = models.CharField(max_length=255)
    gymState = models.CharField(max_length=255)

    class Meta:
        db_table = 'AffilGyms'
        managed = False

    @property
    def gymAbbr(self):
        return {
            "Planet Fitness": "PF",
            "Lifetime Fitness": "LTF",
        }.get(self.gymName, "")


class LTFUsers(models.Model):
    # OCP: This model is open for extension (can add new fields/methods)
    # but closed for modification (existing fields shouldn't change)
    id = models.BigAutoField(primary_key=True)
    userID = models.UUIDField(primary_key=False)
    memberID = models.CharField(max_length=15)
    gymAbbr = models.CharField(max_length=5)
    gymCity = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    firstName = models.CharField(max_length=20)
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=20)
    birthDate = models.CharField(max_length=10)
    phoneNum = models.CharField(max_length=12)
    gender = models.CharField(max_length=10)
    termsAccepted = models.BooleanField(default=False)
    dateJoined = models.DateField(auto_now_add=True)
    activeAccnt = models.BooleanField(default=True)
    gymState = models.CharField(max_length=20)
    auth_user_id = models.CharField(max_length=255, null=True, blank=True)


    class Meta:
        abstract = False
        db_table = 'LTFUsers'


class LifetimeFitnessDB(models.Model):
    # LSP: This model could be substituted for any gym user model
    # while maintaining the same interface/behavior
    databaseID = models.AutoField(primary_key=True)
    gymCity = models.CharField(max_length=255)
    gymAbbr = models.CharField(max_length=10)
    memberID = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    firstName = models.CharField(max_length=255)
    uploadDate = models.DateTimeField()
    gymState = models.CharField(max_length=255)

    class Meta:
        db_table = 'LifetimeFitnessDB'
        managed = False


class PFUsers(models.Model):
    # ISP: This model is specific to Planet Fitness users
    # and does not include unrelated fields
    id = models.BigAutoField(primary_key=True)
    userID = models.UUIDField(primary_key=False)
    memberID = models.CharField(max_length=15)
    gymAbbr = models.CharField(max_length=5)
    gymCity = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    firstName = models.CharField(max_length=20)
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=20)
    birthDate = models.CharField(max_length=10)
    phoneNum = models.CharField(max_length=12)
    gender = models.CharField(max_length=10)
    termsAccepted = models.BooleanField(default=False)
    dateJoined = models.DateField(auto_now_add=True)
    activeAccnt = models.BooleanField(default=True)
    gymState = models.CharField(max_length=20)
    auth_user_id = models.CharField(max_length=255, null=True, blank=True)
    class Meta:
        abstract = False
        db_table = 'PFUsers'


class PlanetFitnessDB(models.Model):
    # DIP: The abstract base models could be created to depend on abstractions
    # rather than concrete implementations
    databaseID = models.AutoField(primary_key=True)
    gymCity = models.CharField(max_length=255)
    gymAbbr = models.CharField(max_length=10)
    memberID = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    firstName = models.CharField(max_length=255)
    uploadDate = models.DateTimeField()
    gymState = models.CharField(max_length=255)

    class Meta:
        db_table = 'PlanetFitnessDB'
        managed = False




# class Item(models.Model):
#     name = models.CharField(max_length=200)
#     description = models.TextField()

#     def __str__(self):
#         return self.name


# class CustomUserManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         """Create and return a regular user with an email and password."""
#         if not email:
#             raise ValueError(_("The Email field is required"))
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)  # Hash password before saving
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         """Create and return a superuser with admin privileges."""
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)

#         if extra_fields.get('is_staff') is not True or extra_fields.get('is_superuser') is not True:
#             raise ValueError(_("Superuser must have is_staff=True and is_superuser=True."))

#         return self.create_user(email, password, **extra_fields)


# class User(AbstractBaseUser, PermissionsMixin):
#     """Custom User model with gym-related fields."""

#     # Required fields
#     email = models.EmailField(unique=True, max_length=255)
#     firstName = models.CharField(max_length=30)
#     lastName = models.CharField(max_length=30)
#     birthDate = models.DateField()

#     # Phone number validation: must be in format XXXx-xXXX-XXXX
#     phoneNumber = models.CharField(
#         max_length=12,
#         validators=[RegexValidator(r'^\d{3}-\d{3}-\d{4}$', message="Phone number must be in the format XXXx-xXXX-XXXX.")]
#     )

#     # Gym-related fields
#     gymAbbr = models.CharField(max_length=3)
#     gymState = models.CharField(max_length=5)
#     gymCity = models.CharField(max_length=20)
#     memberID = models.CharField(max_length=15, unique=True)

#     # Security & Account status
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     date_joined = models.DateTimeField(default=timezone.now)

#     # Define custom manager
#     objects = CustomUserManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['firstName', 'lastName', 'birthDate', 'phoneNumber', 'memberID', 'gymAbbr', 'gymCity']

#     def __str__(self):
#         """String representation of the user."""
#         return f"{self.firstName} {self.lastName} - {self.email.lower()}"

#     def clean(self):
#         """Additional validations"""
#         if self.birthDate >= timezone.now().date():
#             raise ValidationError(_("Birthdate must be in the past."))


# class AffilGyms(models.Model):
#     gymID = models.BigAutoField(primary_key=True)
#     gymName = models.CharField(max_length=100)
#     gymCity = models.CharField(max_length=100)
#     gymState = models.CharField(max_length=100)
    
#     GYM_ABBR_CHOICES = [
#         ('PF', 'Planet Fitness'),
#         ('LTF', 'Lifetime Fitness'),
#     ]
#     gymAbbr = models.CharField(max_length=4, choices=GYM_ABBR_CHOICES)

#     class Meta:
#         unique_together = ('gymAbbr', 'gymCity', 'gymState')
    
#     def __str__(self):
#         return f"{self.gymName} - {self.gymCity}, {self.gymState}"


# class GymMember(models.Model):
#     GYM_CHOICES = (
#         ('PF', 'Planet Fitness'),
#         ('LTF', 'Lifetime Fitness'),
#     )

#     memberID = models.CharField(max_length=15, unique=True)
#     gymAbbr = models.CharField(max_length=4, choices=GYM_CHOICES)
#     gymCity = models.CharField(max_length=20)
#     gymState = models.CharField(max_length=20)
#     firstName = models.CharField(max_length=20)
#     lastName = models.CharField(max_length=20)
#     uploadDate = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         unique_together = ('gymAbbr', 'memberID', 'gymCity', 'gymState')
#         db_table = 'GymMembers'
#         managed = False  # Set to False if Supabase owns table creation

#     def __str__(self):
#         return f"{self.gymAbbr}-{self.memberID} ({self.firstName} {self.lastName})"



# class FindGymMember(models.Model):
#     memberID = models.CharField(max_length=15, unique=True)
#     gymAbbr = models.CharField(max_length=10)
#     gymCity = models.CharField(max_length=20)
#     gymState = models.CharField(max_length=20)
#     firstName = models.CharField(max_length=20)
#     lastName = models.CharField(max_length=20)
#     uploadDate = models.DateTimeField(auto_now_add=True)
#     class Meta:
#         abstract = False

# class PlanetFitnessDB(FindGymMember):
#     class Meta:
#         db_table = "PlanetFitnessDB"
#         managed = False

# class LifetimeFitnessDB(FindGymMember):
#     class Meta:
#         db_table = "LifetimeFitnessDB"
#         managed = False

# class SetGymUser(models.Model):
#     memberID = models.CharField(max_length=15)
#     gymAbbr = models.CharField(max_length=10)
#     gymCity = models.CharField(max_length=20)
#     gymState = models.CharField(max_length=20)
#     firstName = models.CharField(max_length=20)
#     lastName = models.CharField(max_length=20)
#     email = models.CharField(max_length=30)
#     password = models.CharField(max_length=20)
#     birthDate = models.CharField(max_length=10)
#     phoneNum = models.CharField(max_length=12)
#     gender = models.CharField(max_length=10)
#     termsAccepted = models.BooleanField(default=False)
#     dateJoined = models.DateField(auto_now_add=True)
#     activeAccnt = models.BooleanField(default=True)
#     userID = models.UUIDField(primary_key=True)

#     class Meta:
#         abstract = False

# class PFUsers(SetGymUser):
#     class Meta:
#         db_table = "PFUsers"
#         managed = False

# class LTFUsers(SetGymUser):
#     class Meta:
#         db_table = "LTFUsers"
#         managed = False



# class AffilGyms(models.Model):
#     gymName = models.CharField(max_length=255)
#     gymAbbr = models.CharField(max_length=10)
#     gymCity = models.CharField(max_length=255)
#     gymState = models.CharField(max_length=255)
#     class Meta:
#         db_table = 'AffilGyms'
#         managed = False


# class PlanetFitnessDB(models.Model):
#     memberID = models.CharField(max_length=255)
#     gymAbbr = models.CharField(max_length=10)
#     gymCity = models.CharField(max_length=255)
#     gymState = models.CharField(max_length=255)
#     firstName = models.CharField(max_length=255)
#     lastName = models.CharField(max_length=255)
#     uploadDate = models.DateTimeField()
#     class Meta:
#         db_table = "PlanetFitnessDB"
#         managed = False

# class LifetimeFitnessDB(models.Model):
#     memberID = models.CharField(max_length=255)
#     gymAbbr = models.CharField(max_length=10)
#     gymCity = models.CharField(max_length=255)
#     gymState = models.CharField(max_length=255)
#     firstName = models.CharField(max_length=255)
#     lastName = models.CharField(max_length=255)
#     uploadDate = models.DateTimeField()
#     class Meta:
#         db_table = "LifetimeFitnessDB"
#         managed = False


# class PFUsers(models.Model):
#     userID = models.UUIDField(primary_key=True)
#     memberID = models.CharField(max_length=15)
#     gymAbbr = models.CharField(max_length=5)
#     gymCity = models.CharField(max_length=20)
#     lastName = models.CharField(max_length=20)
#     firstName = models.CharField(max_length=20)
#     email = models.CharField(max_length=30)
#     password = models.CharField(max_length=20)
#     birthDate = models.CharField(max_length=10)
#     phoneNum = models.CharField(max_length=12)
#     gender = models.CharField(max_length=10)
#     termsAccepted = models.BooleanField(default=False)
#     dateJoined = models.DateField(auto_now_add=True)
#     activeAccnt = models.BooleanField(default=True)
#     gymState = models.CharField(max_length=20)
#     class Meta:
#         abstract = False
#         db_table = 'PFUsers'

# class LTFUsers(models.Model):
#     userID = models.UUIDField(primary_key=True)
#     memberID = models.CharField(max_length=15)
#     gymAbbr = models.CharField(max_length=5)
#     gymCity = models.CharField(max_length=20)
#     lastName = models.CharField(max_length=20)
#     firstName = models.CharField(max_length=20)
#     email = models.CharField(max_length=30)
#     password = models.CharField(max_length=20)
#     birthDate = models.CharField(max_length=10)
#     phoneNum = models.CharField(max_length=12)
#     gender = models.CharField(max_length=10)
#     termsAccepted = models.BooleanField(default=False)
#     dateJoined = models.DateField(auto_now_add=True)
#     activeAccnt = models.BooleanField(default=True)
#     gymState = models.CharField(max_length=20)
#     class Meta:
#         abstract = False
#         db_table = 'LTFUsers'

# # Represents the PlanetFitnessDB table (used as a foreign key source for PFUsers)
# class PlanetFitnessDB(models.Model):
#     databaseID = models.AutoField(primary_key=True)
#     gymCity = models.CharField(max_length=255)
#     gymAbbr = models.CharField(max_length=10)
#     memberID = models.CharField(max_length=255)
#     lastName = models.CharField(max_length=255)
#     firstName = models.CharField(max_length=255)
#     uploadDate = models.DateTimeField(auto_now_add=True)
#     gymState = models.CharField(max_length=255)

#     class Meta:
#         db_table = 'PlanetFitnessDB'  # Match the exact table name in Supabase
#         managed = False  # Prevent Django from modifying this Supabase-managed table


# class GymFitnessDB(models.Model):
#     databaseID = models.AutoField(primary_key=True)
#     gymCity = models.CharField(max_length=255)
#     gymAbbr = models.CharField(max_length=10)
#     memberID = models.CharField(max_length=255)
#     lastName = models.CharField(max_length=255)
#     firstName = models.CharField(max_length=255)
#     uploadDate = models.DateTimeField(auto_now_add=True)
#     gymState = models.CharField(max_length=255)

#     class Meta:
#         db_table = 'PlanetFitnessDB'  # Match the exact table name in Supabase
#         managed = False  # Prevent Django from modifying this Supabase-managed table