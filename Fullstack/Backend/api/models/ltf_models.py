from django.db import models


class LTFUser(models.Model):
    userID = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=255)
    memberID = models.CharField(max_length=255)
    gymAbbr = models.CharField(max_length=10)
    gymCity =models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    firstName = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    dob = models.CharField(max_length=255)
    phoneNum = models.CharField(max_length=255)
    gender = models.CharField(max_length=50)
    termsAccepted = models.BooleanField()
    dateJoined = models.DateField()
    activeAccnt = models.BooleanField()
    gymState = models.CharField(max_length=255)

    class Meta:
        db_table = 'PFUsers'
        managed = False


class LifetimeFitnessDB(models.Model):
    databaseID = models.AutoField(primary_key=True)
    memberID = models.CharField(max_length=255)
    gymAbbr = models.CharField(max_length=10)
    gymCity = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    firstName = models.CharField(max_length=255)
    uploadDate = models.DateTimeField()
    gymState = models.CharField(max_length=255)

    class Meta:
        db_table = 'PlanetFitnessDB'
        managed = False
