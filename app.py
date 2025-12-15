#  Starts the API server and initializes the database

from http.server import HTTPServer
from router import ReservationRouter
from database.connection import init_database

def run_server():
    init_database()
    server = HTTPServer(("", 8000), ReservationRouter)
    print(f"🚄 Server running at http://localhost:8000")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down serve ....")
    finally:
        server.server_close()
        print("Server stopped.")

if __name__ == "__main__":
            run_server()