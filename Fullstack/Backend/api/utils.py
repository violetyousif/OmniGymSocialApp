from django.conf import settings

import requests
from django.conf import settings

# This function simplifies the SUPABASE_URL calls to the Supabase API.
# It uses the service role key for authentication.
SUPABASE_HEADERS = {
    "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
    "Content-Type": "application/json"
}

# This function checks if a user exists in Supabase by their email address.
# It is used in the registration process to ensure that the email is not already in use (views.py).
def check_supabase_user_exists(email):
    url = f"{settings.SUPABASE_URL}/auth/v1/admin/users?email={email}"
    response = requests.get(url, headers=SUPABASE_HEADERS)
    if response.status_code == 200:
        users = response.json().get("users", [])
        return len(users) > 0
    return False
