from django.contrib import admin
from .models.pf_models import PFUser, PlanetFitnessDB  # ✅ Corrected import path

# ✅ Register both models for visibility in admin panel (optional)
admin.site.register(PFUser)
admin.site.register(PlanetFitnessDB)
