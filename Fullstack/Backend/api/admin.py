from django.contrib import admin
from .models.pf_models import PFUser, PlanetFitnessDB
from .models.ltf_models import LifetimeFitnessDB, LTFUsers, AffilGyms
from .models import Item 

# Register models for visibility in admin panel (optional)
admin.site.register(Item)  # Optional: Register Item model for admin panel
admin.site.register(PFUser)
admin.site.register(PlanetFitnessDB)
admin.site.register(AffilGyms)
admin.site.register(LifetimeFitnessDB)
admin.site.register(LTFUsers)


