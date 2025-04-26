import psycopg2
from urllib.parse import urlparse
from dotenv import load_dotenv
import os
 
# Load environment variables from .env
load_dotenv()
 
# Fetch the DATABASE_URL from .env file
DATABASE_URL = os.getenv("DATABASE_URL")
 
# Parse the URL to extract connection details
url = urlparse(DATABASE_URL)
USER = url.username
PASSWORD = url.password
HOST = url.hostname
PORT = url.port
DBNAME = url.path[1:]  # Remove the leading '/' from the db name
 
# Connect to the database
try:
    connection = psycopg2.connect(
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT,
        dbname=DBNAME
    )
    print("Connection successful!")
   
    # Create a cursor to execute SQL queries
    cursor = connection.cursor()
   
    # Example query
    cursor.execute("SELECT NOW();")
    result = cursor.fetchone()
    print("Current Time:", result)
 
    # Close the cursor and connection
    cursor.close()
    connection.close()
    print("Connection closed.")
 
except Exception as e:
    print(f"Failed to connect: {e}")


#codebase