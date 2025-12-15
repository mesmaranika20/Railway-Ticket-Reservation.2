##################### API Observation Via Codespace URL
##################### API Observation Via Hopscotch
##################### API Observation Via CURL

# A. Get All Trains
curl -X GET "https://super-space-disco-x57rvprjvpxqfp447-8000.app.github.dev/api/students"

# B. Get One Student
curl -X GET "http://localhost:8000/api/students/1"

# C. Create Student
curl -X POST "https://vigilant-space-winner-r4q7xx6p7v5rcp94r-8000.app.github.dev/api/students" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "course": "Computer Science",
    "year": 2
  }'

# D. Update Student
curl -X PUT "https://vigilant-space-winner-r4q7xx6p7v5rcp94r-8000.app.github.dev/api/students/2" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Updated",
    "email": "alice_new@example.com",
    "course": "Data Science",
    "year": 3
  }'

E. Delete Student
curl -X DELETE "https://vigilant-space-winner-r4q7xx6p7v5rcp94r-8000.app.github.dev/api/students/2"


##################### DB Observation Via SQLite Web
# - install https://github.com/coleifer/sqlite-web
# - pip install sqlite-web
# - sqlite_web students.db