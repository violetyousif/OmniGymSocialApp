from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.utils import timezone

class AffilGyms(models.Model):
    gymID = models.BigAutoField(primary_key=True)
    gymName = models.CharField(max_length=100)
    gymCity = models.CharField(max_length=100)
    gymState = models.CharField(max_length=100)
    
    GYM_ABBR_CHOICES = [
        ('PF', 'Planet Fitness'),
        ('LTF', 'Lifetime Fitness'),
    ]
    gymAbbr = models.CharField(max_length=4, choices=GYM_ABBR_CHOICES)

    class Meta:
        unique_together = ('gymAbbr', 'gymCity', 'gymState')
    
    def __str__(self):
        return f"{self.gymName} - {self.gymCity}, {self.gymState}"