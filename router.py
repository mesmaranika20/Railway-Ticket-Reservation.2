# Matches incoming HTTP paths (URLs) to handlers (like a tiny Express/Django router)

from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
from controllers.reports import get_reservation_report

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

from controllers.reservations import (
    get_all_reservations,
    get_reservation,
    create_reservation,
    delete_reservation,
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

FRONTEND_ROUTES = {"/", "/home", "/trains", "/bookings", "/staff","/reservations", "/reports/reservations","/events", "/docs"}

def handle_ui_routes(handler, path):
    # Catch-all frontend routes
    if path in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True
    
    if path.endswith(".html"):
        stripped = path.replace(".html", "")
        if stripped in FRONTEND_ROUTES:
            serve_static(handler, "frontend/pages/index.html")
            return True
      # Serve assets at /assets/...  -> frontend/assets/...
    if path.startswith("/assets/"):
        serve_static(handler, "frontend" + path)
        return True

    if path.startswith("/frontend/"):
        serve_static(handler, path.lstrip("/"))
        return True

    if path == "/openapi.yaml":
        serve_static(handler, "openapi.yaml")
        return True

    
    # Dynamic SPA routes (profiles pages)
    # e.g. /profiles/1 should still load index.html and let the SPA router decide
    if path.startswith("/events/"):
        serve_static(handler, "frontend/pages/index.html")
        return True
    
    return False

def _last_path_id_or_404(handler, path):
    """
    Extract the last path segment and ensure it's a number.
    If it's not a number, return None after sending 404 (no crash).
    """
    last = path.split("/")[-1]
    if not last.isdigit():
        send_404(handler)
        return None
    return int(last)

class RailwayRouter(BaseHTTPRequestHandler):
    
    def do_OPTIONS(self):
        # Why OPTIONS exists:
        # Browsers enforce security rules.
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()
    # ---------------------------
    # READ (GET)
    # ---------------------------
    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/events" or path == "/events.html":
          return serve_static(self, "frontend/pages/events.html")
        # UI Routes
        if handle_ui_routes(self, path):
            return

          # ---------------------------
        # TRAINS
        # ---------------------------
        
        # API: List trains
        if path == "/api/trains":
          return get_all_trains(self)
        
        # API: Get train by id
        if path.startswith("/api/trains/"):
           train_id = _last_path_id_or_404(self, path)
            if train_id is None:
                return
           return get_train(self, train_id)

        # ---------------------------
        # BOOKINGS
        # ---------------------------
        # API: List bookings
        if path == "/api/bookings":
           return get_all_bookings(self)
        
        # API: Get booking by id
        if path.startswith("/api/bookings/"):
            booking_id =  _last_path_id_or_404(self, path)
                if bookings_id is None:
                return
            return get_booking(self, booking_id)

         # ---------------------------
        # RESERVATIONS
        # ---------------------------
        if path == "/api/reservations":
            return get_all_reservations(self)

        if path.startswith("/api/reservations/"):
            reservation_id = _last_path_id_or_404(self, path)
            if  reservation_id is None:
                return
            return get_reservation(self, reservation_id)

         # ---------------------------
        # REPORTS (JOIN)
        # ---------------------------
        if path == "/api/reports/reservations":
            return get_reservation_report(self)    

        # ---------------------------
        # STAFF
        # --------------------------- 
        # API: List staff
        if path == "/api/staff":
            return get_all_staff(self)
        
        # API: Get staff by id
        if path.startswith("/api/staff/"):
            staff_id = _last_path_id_or_404(self, path)
            if staff_id is None:
                return
            return get_staff(self, staff_id)
        
        return send_404(self)

    # ---------------------------
    # CREATE (POST)
    # ---------------------------
    def do_POST(self):
        path = urlparse(self.path).path
        
        # API: Create train
        if path == "/api/trains":
            return create_train(self)
        
        # API: Create booking
        if path == "/api/bookings":
            return create_booking(self)
        
        if self.path == "/api/reservations":
            return create_reservation(self)
        
        
        # API: Create staff
        if path == "/api/staff":
            return create_staff(self)
        
        return send_404(self)

     # ---------------------------
    # UPDATE (PUT)
    # ---------------------------
    def do_PUT(self):
        path = urlparse(self.path).path
    
     # TRAINS    
    #     # API: Update train
        if path.startswith("/api/trains/"):
            train_id =  _last_path_id_or_404(self, path)
            if train_id is None:
                return
            return update_train(self, train_id)

        #BOOKINGS
         # API: Update booking
        if path.startswith("/api/bookings/"):
            booking_id = _last_path_id_or_404(self, path)
            if booking_id is None:
                return
            return update_booking(self, booking_id)

        #UPDATE
         # API: Update staff
        if path.startswith("/api/staff/"):
            staff_id =_last_path_id_or_404(self, path)
            if staff_id is None :
                return
            return update_staff(self, staff_id)
        
        return send_404(self)

    
    # ---------------------------
    # DELETE (DELETE)
    # ---------------------------
    def do_DELETE(self):
        parsed = urlparse(self.path).path
        
    #     # API: Delete train
        if path.startswith("/api/trains/"):
            train_id =  _last_path_id_or_404(self, path)
             if train_id is None:
                return
            return delete_train(self, train_id)
        
    #     # API: Cancel booking
        if path.startswith("/api/bookings/"):
            booking_id = _last_path_id_or_404(self, path)
             if booking_id is None:
                return
            return delete_booking(self, booking_id)
        
        if self.path.startswith("/api/reservations"):
            reservation_id = _last_path_id_or_404(self, path)
             if reservation_id is None:
                return
            return delete_reservation(self,reservation_id)
        
    #     # API: Delete staff
        if path.startswith("/api/staff/"):
            staff_id = _last_path_id_or_404(self, path)
             if staff_id is None:
                return
            return delete_staff(self, staff_id)
        
        return send_404(self)

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")


   
