############################################
# Railway Ticket Reservation – API Observation
############################################

# A. Get All Trains
curl -X GET "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/trains"

# GET ALL BOOKINGS
curl -X GET "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/bookings"

#   GET ALL STAFF
curl -X GET "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/staff"

# ------------------------------------------

# B. Get One Train
curl -X GET "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/trains/1"

# -------CREATE TRAIN-----------------------------------
curl -X POST "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/trains" \
-H "Content-Type: application/json" \
-d '{
  "train_name": "Rajdhani Express",
  "source": "Delhi",
  "destination": "Mumbai",
  "departure_time": "18:30",
  "arrival_time": "08:15"
}'
#  UPDATE THE TRAINS

curl -X PUT "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/trains/1" \
  -H "Content-Type: application/json" \
  -d '{
    "train_name": "Express Line Updated",
    "source": "New York",
    "destination": "Washington DC",
    "departure_time": "2025-01-10 08:30",
    "arrival_time": "2025-01-10 12:45"
  }'

  # DELETE TRAINS
  curl -X DELETE "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev//api/trains/1"


# C. Get All Bookings
curl -X GET "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/bookings"

# ------------------------------------------

# D. Get One Booking
curl -X GET "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/bookings/1"

# ------------------------------------------

# E. Create Booking
curl -X POST "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/bookings" \
-H "Content-Type: application/json" \
-d '{
  "train_id": 1,
  "passenger_name": "Smaranika sahu",
  "seat_number": "H1-20",
  "booking_date": "2025-12-19"
}'

# ------------------------------------------

# F. Update Booking
curl -X PUT "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/bookings/2" \
  -H "Content-Type: application/json" \
  -d '{
    "train_id": 2,
    "passenger_name": "Alisha Patro",
    "seat_number": "S1-73",
    "booking_date": "2025-01-15"
  }'


# ------------------------------------------

# G. Delete Booking
curl -X DELETE "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/bookings/5"


# ------------------------------------------

# H. Get All Staff
curl -X GET "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/staff"



#  CREATE STAFF
curl -X POST "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/staff" \
-H "Content-Type: application/json" \
-d '{
  "name": "Bishnu Priya",
  "role": "Ticket Clerk",
  "contact": "8093913335"
}'


#  UPDATE STAFF
curl -X PUT "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/staff/10" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "T.Pranati",
    "role": "Train Supervisor",
    "contact": "+1-987-654-3210"
  }'


  #  DELETE STAFF
  curl -X DELETE "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/staff/9"
