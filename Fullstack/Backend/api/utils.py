import requests
from django.conf import settings

# --- SRP – Single Responsibility Principle: Only responsible for holding Supabase API header config ---
# This function simplifies the SUPABASE_URL calls to the Supabase API.
# It uses the service role key for authentication.
SUPABASE_HEADERS = {
    "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
    "Content-Type": "application/json"
}

def test_supabase_connection():
    """Test Supabase Admin API access and print user list or error."""
    try:
        response = requests.get(
            f"{settings.SUPABASE_URL}/auth/v1/admin/users",
            headers=SUPABASE_HEADERS
        )
        print("📡 Supabase Response Status:", response.status_code)

        try:
            data = response.json()
            print("✅ JSON Response:")
            print(data)
        except ValueError:
            print("❌ Response is not valid JSON.")
            print("Raw response:", response.text)

    except Exception as e:
        print("❌ Error contacting Supabase:", str(e))


# --- SRP: One responsibility (check if user exists) ---
# --- DIP: Dependency Inversion Principle: abstracted from the view.py file that requires a higher-level interface logic ---
# This function checks if a user exists in Supabase's built-in auth table by their email address.
# It is used in the registration process to ensure that the email is not already in use (views.py).
# def check_supabase_user_exists(email):
#     url = f"{settings.SUPABASE_URL}/auth/v1/admin/users?email={email}"
#     response = requests.get(url, headers=SUPABASE_HEADERS)
#     if response.status_code == 200:
#         users = response.json().get("users", [])
#         return len(users) > 0   # Returns True if a user with that email exists
#     return False
