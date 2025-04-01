# from django.db import models



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

# class LifetimeFitnessDB(models.Model):
#     databaseID = models.AutoField(primary_key=True)
#     gymCity = models.CharField(max_length=255)
#     gymAbbr = models.CharField(max_length=10)
#     memberID = models.CharField(max_length=255)
#     lastName = models.CharField(max_length=255)
#     firstName = models.CharField(max_length=255)
#     uploadDate = models.DateTimeField()
#     gymState = models.CharField(max_length=255)
#     class Meta:
#         db_table = 'LifetimeFitnessDB'
#         managed = False


# class LifetimeFitnessDB(models.Model):
#     databaseID = models.AutoField(primary_key=True)
#     memberID = models.CharField(max_length=255)
#     gymAbbr = models.CharField(max_length=10)
#     gymCity = models.CharField(max_length=255)
#     lastName = models.CharField(max_length=255)
#     firstName = models.CharField(max_length=255)
#     uploadDate = models.DateTimeField()
#     gymState = models.CharField(max_length=255)

#     class Meta:
#         db_table = 'LifetimeFitnessDB'
#         managed = False
