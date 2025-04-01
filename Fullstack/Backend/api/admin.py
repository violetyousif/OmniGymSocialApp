from django.contrib import admin
# from .models.pf_models import PFUsers, PlanetFitnessDB
# from .models.ltf_models import LifetimeFitnessDB, LTFUsers
# from .models.globalOps_models import AffilGyms
from .models import AffilGyms, PFUsers, PlanetFitnessDB, LifetimeFitnessDB, LTFUsers
# from .models import Item 

# Register models for visibility in admin panel (optional)
# admin.site.register(Item)  # Optional: Register Item model for admin panel
# admin.site.register(User)  # Register User model for admin panel
admin.site.register(PFUsers)
admin.site.register(PlanetFitnessDB)
admin.site.register(AffilGyms)
admin.site.register(LifetimeFitnessDB)
admin.site.register(LTFUsers)


