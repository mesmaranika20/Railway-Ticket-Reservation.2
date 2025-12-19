# Matches incoming HTTP paths (URLs) to handlers (like a tiny Express/Django router)

from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from controllers.trains import (
    get_all_trains,
    get_train,
    create_train,
    update_train,
    delete_train
)

from controllers.bookings import (
    get_all_bookings,
    get_booking,
    create_booking,
    update_booking,
    delete_booking
)

from controllers.staff import (
    get_all_staff,
    get_staff,
    create_staff,
    update_staff,
    delete_staff
)

from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers

# FRONTEND_ROUTES = {"/", "/home", "/trains", "/bookings", "/staff", "/docs"}

# def handle_ui_routes(handler, path):
#     # Catch-all frontend routes
#     if path in FRONTEND_ROUTES:
#         serve_static(handler, "frontend/pages/index.html")
#         return True
    
#     if path.endswith(".html"):
#         stripped = path.replace(".html", "")
#         if stripped in FRONTEND_ROUTES:
#             serve_static(handler, "frontend/pages/index.html")
#             return True
    
#     if path.startswith("/frontend/"):
#         serve_static(handler, path.lstrip("/"))
#         return True
    
#     return False

class RailwayRouter(BaseHTTPRequestHandler):
    
    def do_OPTIONS(self):
        # Why OPTIONS exists:
        # Browsers enforce security rules.
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()
    
    def do_GET(self):
        path = urlparse(self.path).path
        # UI Routes
        # if handle_ui_routes(self, path):
        #     return
        
        
        # API: List trains
        if path == "/api/trains":
          return get_all_trains(self)
        
        # API: Get train by id
        if path.startswith("/api/trains/"):
           train_id = int(path.split("/")[-1])
           return get_train(self, train_id)
        
        # API: List bookings
        if path == "/api/bookings":
           return get_all_bookings(self)
        
        # API: Get booking by id
        if path.startswith("/api/bookings/"):
            booking_id = int(path.split("/")[-1])
            return get_booking(self, booking_id)
        
        # API: List staff
        if path == "/api/staff":
            return get_all_staff(self)
        
        # API: Get staff by id
        if path.startswith("/api/staff/"):
            staff_id = int(path.split("/")[-1])
            return get_staff(self, staff_id)
        
        return send_404(self)
    
    def do_POST(self):
        path = urlparse(self.path).path
        
        # API: Create train
        if path == "/api/trains":
            return create_train(self)
        
        # API: Create booking
        if path == "/api/bookings":
            return create_booking(self)
        
        # API: Create staff
        if path == "/api/staff":
            return create_staff(self)
        
        return send_404(self)
    
    def do_PUT(self):
        parsed = urlparse(self.path)
        path = parsed.path
        
    #     # API: Update train
        if path.startswith("/api/trains/"):
            train_id = int(path.split("/")[-1])
            return update_train(self, train_id)
        
    #     # API: Update booking
        if path.startswith("/api/bookings/"):
            booking_id = int(path.split("/")[-1])
            return update_booking(self, booking_id)
        
    #     # API: Update staff
        if path.startswith("/api/staff/"):
            staff_id = int(path.split("/")[-1])
            return update_staff(self, staff_id)
        
        return send_404(self)
    
    def do_DELETE(self):
        parsed = urlparse(self.path)
        path = parsed.path
        
    #     # API: Delete train
        if path.startswith("/api/trains/"):
            train_id = int(path.split("/")[-1])
            return delete_train(self, train_id)
        
    #     # API: Cancel booking
        if path.startswith("/api/bookings/"):
            booking_id = int(path.split("/")[-1])
            return delete_booking(self, booking_id)
        
    #     # API: Delete staff
        if path.startswith("/api/staff/"):
            staff_id = int(path.split("/")[-1])
            return delete_staff(self, staff_id)
        
        return send_404(self)

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")


   