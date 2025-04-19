# api/models/pf_models.py
 
# from django.db import models

# This model maps to the existing 'PFUsers' table in Supabase.
# Django will not try to create or manage this table during migrations.
# class PFUsers(models.Model):
#     userID = models.BigAutoField(primary_key=True)
#     username = models.CharField(max_length=255)
#     memberID = models.CharField(max_length=255)
#     gymAbbr = models.CharField(max_length=10)
#     gymCity =models.CharField(max_length=255)
#     lastName = models.CharField(max_length=255)
#     firstName = models.CharField(max_length=255)
#     email = models.CharField(max_length=255)
#     password = models.CharField(max_length=255)
#     dob = models.CharField(max_length=255)
#     phoneNum = models.CharField(max_length=255)
#     gender = models.CharField(max_length=50)
#     termsAccepted = models.BooleanField()
#     dateJoined = models.DateField()
#     activeAccnt = models.BooleanField()
#     gymState = models.CharField(max_length=255)

#     class Meta:
#         db_table = 'PFUsers'
#         managed = False


# This model maps to the existing 'PlanetFitnessDB' table in Supabase.
# It must exist before inserting into PFUsers because of foreign key constraints.
# class PlanetFitnessDB(models.Model):
#     databaseID = models.AutoField(primary_key=True)
#     memberID = models.CharField(max_length=255)
#     gymAbbr = models.CharField(max_length=10)
#     gymCity = models.CharField(max_length=255)
#     lastName = models.CharField(max_length=255)
#     firstName = models.CharField(max_length=255)
#     uploadDate = models.DateTimeField()
#     gymState = models.CharField(max_length=255)

#     class Meta:
#         db_table = 'PlanetFitnessDB'
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

# class PlanetFitnessDB(models.Model):
#     databaseID = models.AutoField(primary_key=True)
#     gymCity = models.CharField(max_length=255)
#     gymAbbr = models.CharField(max_length=10)
#     memberID = models.CharField(max_length=255)
#     lastName = models.CharField(max_length=255)
#     firstName = models.CharField(max_length=255)
#     uploadDate = models.DateTimeField()
#     gymState = models.CharField(max_length=255)
#     class Meta:
#         db_table = 'PlanetFitnessDB'
#         managed = False