from django.db import models
from django.utils.translation import gettext_lazy as _  # for debugging

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

# This class is used to get the users at the lifetime gym
class LTFUsers(models.Model):
    # OCP: This model is open for extension (can add new fields/methods)
    # but closed for modification (existing fields shouldn't change)
    id = models.BigAutoField(primary_key=True)
    # userID = models.UUIDField(primary_key=False)
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


# This class is used to check users from the lifetime gym during registration
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


#  This class is used to get the users at the planet fitness gym
class PFUsers(models.Model):
    # ISP: This model is specific to Planet Fitness users
    # and does not include unrelated fields
    id = models.BigAutoField(primary_key=True)
    # userID = models.UUIDField(primary_key=False)
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

# This class is used to check users from the planet fitness gym during registration
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

# This class is used to get the users metrics at the planet fitness gym
class PFUserMetrics(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]
    # GENDER_CHOICES = PFUsers.gender

    metricsID = models.BigAutoField(primary_key=True)
    updatedDate = models.DateField(auto_now=True)
    email = models.EmailField()
    gender = models.CharField(max_length=10)
    memberWeight = models.FloatField(null=True, blank=True)
    height = models.CharField(max_length=100, null=True, blank=True)
    prBenchWeight = models.FloatField(null=True, blank=True)
    prBenchReps = models.SmallIntegerField(null=True, blank=True)
    prDeadliftWeight = models.FloatField(null=True, blank=True)
    prDeadliftReps = models.SmallIntegerField(null=True, blank=True)
    prSquatWeight = models.FloatField(null=True, blank=True)
    prSquatReps = models.SmallIntegerField(null=True, blank=True)
    runningTime = models.CharField(max_length=20, null=True, blank=True)
    runningDist = models.FloatField(null=True, blank=True)
    wilks2Score = models.IntegerField(null=True, blank=True)
    
    auth_user_id = models.CharField(max_length=255, unique=True, null=True, blank=True)

    class Meta:
        db_table = 'UserMetrics'
        constraints = [
            models.UniqueConstraint(fields=['auth_user'], name='unique_auth_user_metrics')
        ]
    
    # For debugging in console
    def __str__(self):
        return f"{self.email} - {self.updatedDate}"

  #codebase