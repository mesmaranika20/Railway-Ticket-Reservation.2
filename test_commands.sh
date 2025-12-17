##################### API Observation Via Codespace URL
##################### API Observation Via Hopscotch
##################### API Observation Via CURL

# A. Get All Trains
curl -X GET "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/trains"

# B. Get One Trains
curl -X GET "http://localhost:8000/api/trains/1"

# C. Create Trains
curl -X POST "https://vigilant-space-winner-r4q7xx6p7v5rcp94r-8000.app.github.dev/api/trains" \
  -H "Content-Type: application/json" \
  -d '{
    "train_name": "Rajdhani Express",
    "source": "Delhi",
    "destination": "Muumbai",
    "departured_time":"18:30",
    "arrival_time": "08:15"
  }'

# D. Update Student
curl -X PUT "https://vigilant-space-winner-r4q7xx6p7v5rcp94r-8000.app.github.dev/api/trains/2" \
  -H "Content-Type: application/json" \
  -d '{
    "train_name": "Coromondal Express",
    "source": "chenai",
    "destination": "westbengal",
    "departured_time":"12:50",
    "arrival_time": "23:45"
  }'

E. Delete Student
curl -X DELETE "https://vigilant-space-winner-r4q7xx6p7v5rcp94r-8000.app.github.dev/api/students/2"


##################### DB Observation Via SQLite Web
# - install https://github.com/coleifer/sqlite-web
# - pip install sqlite-web
# - sqlite_web students.db