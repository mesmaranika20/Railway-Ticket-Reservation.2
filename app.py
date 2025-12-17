from http.server import HTTPServer
from router import RailwayRouter
from database.connection import init_database

def run_server():
    init_database()
    server_address = ("", 8000)
    httpd = HTTPServer(server_address, RailwayRouter)
    print("🚀 Server running at http://localhost:8000")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()