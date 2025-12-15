
# config.py
# Stores constant data (NOT executed)

DATABASE_NAME = "railway.db"


# -----------------------------
# Train schedule static data
# -----------------------------
TRAINS_DATA = [
    {
        "id": 1,
        "name": "Chennai Express",
        "source": "Chennai",
        "destination": "Mumbai",
        "departure": "06:00 AM",
        "arrival": "08:45 PM"
    },
    {
        "id": 2,
        "name": "Howrah Mail",
        "source": "Kolkata",
        "destination": "Chennai",
        "departure": "04:15 PM",
        "arrival": "07:30 AM"
    },
    {
        "id": 3,
        "name": "Shatabdi Express",
        "source": "Delhi",
        "destination": "Bhopal",
        "departure": "06:00 AM",
        "arrival": "12:00 PM"
    }
]


# -----------------------------
# Staff information static data
# -----------------------------
STAFF_DATA = [
    {
        "id": 1,
        "name": "Ravi Kumar",
        "role": "Ticket Collector",
        "experience": "5 years"
    },
    {
        "id": 2,
        "name": "Priya Sharma",
        "role": "Station Master",
        "experience": "10 years"
    },
    {
        "id": 3,
        "name": "Amit Singh",
        "role": "Train Driver",
        "experience": "8 years"
    }
]

# ---------------------------
# Server Configuration
# ---------------------------

HOST = "localhost"
PORT = 8000                         # Your API will run on http://localhost:8000


# ---------------------------
# CORS Settings (if needed)
# ---------------------------

ALLOWED_ORIGINS = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:5500",
]


# ---------------------------
# Project Settings
# ---------------------------

PROJECT_NAME = "Railway Ticket Reservation System"

# How many seats one train coach can have (custom rule)
MAX_SEATS_PER_TRAIN = 200