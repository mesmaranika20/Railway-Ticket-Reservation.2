############################################
# Railway Ticket Reservation – API Observation
############################################

# A. Get All Trains
curl -X GET "http://localhost:8000/api/trains"

# GET ALL BOOKINGS
curl -X GET "http://localhost:8000/api/bookings"

#   GET ALL STAFF
curl -X GET "http://localhost:8000/api/staff"

# ------------------------------------------

# B. Get One Train
curl -X GET "http://localhost:8000/api/trains/1"

# -------CREATE TRAIN-----------------------------------
curl -X POST "http://localhost:8000/api/trains" \
-H "Content-Type: application/json" \
-d '{
  "train_name": "Rajdhani Express",
  "source": "Delhi",
  "destination": "Mumbai",
  "departure_time": "18:30",
  "arrival_time": "08:15"
}'
#  UPDATE THE TRAINS

curl -X PUT "http://localhost:8000/api/trains/1" \
  -H "Content-Type: application/json" \
  -d '{
    "train_name": "Express Line Updated",
    "source": "New York",
    "destination": "Washington DC",
    "departure_time": "2025-01-10 08:30",
    "arrival_time": "2025-01-10 12:45"
  }'

  # DELETE TRAINS
  curl -X DELETE "http://localhost:8000/api/trains/1"


# C. Get All Bookings
curl -X GET "http://localhost:8000/api/bookings"

# ------------------------------------------

# D. Get One Booking
curl -X GET "http://localhost:8000/api/bookings/1"

# ------------------------------------------

# E. Create Booking
curl -X POST "http://localhost:8000/api/bookings" \
-H "Content-Type: application/json" \
-d '{
  "train_id": 1,
  "passenger_name": "Bishnu Priya",
  "seat_number": "S1-12",
  "booking_date": "2025-12-19"
}'

# ------------------------------------------

# F. Update Booking
curl -X PUT "http://localhost:8000/api/bookings/1" \
  -H "Content-Type: application/json" \
    -d '{
        "train_id": 2,
            "passenger_name": "alisha Updated",
                "seat_number": "B12",
                    "booking_date": "2025-01-15"
                      }'


# ------------------------------------------

# G. Delete Booking
curl -X DELETE "http://localhost:8000/api/bookings/1"


# ------------------------------------------

# H. Get All Staff
curl -X GET "http://localhost:8000/api/staff"



#  CREATE STAFF
curl -X POST "http://localhost:8000/api/staff" \
-H "Content-Type: application/json" \
-d '{
  "name": "Ramesh Kumar",
  "role": "Ticket Clerk",
  "contact": "9876543210"
}'


#  UPDATE STAFF
curl -X PUT "http://localhost:8000/api/staff/1" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Robert Smith Updated",
    "role": "Train Supervisor",
    "contact": "+1-987-654-3210"
  }'


  #  DELETE STAFF
  curl -X DELETE "http://localhost:8000/api/staff/1"
