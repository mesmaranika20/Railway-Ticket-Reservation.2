# Matches incoming HTTP paths (URLs) to handlers (like a tiny Express/Django router)


from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

from controllers.train_controller import (
    get_all_trains,
    get_train
)

from controllers.booking_controller import (
    get_all_bookings,
    create_booking,
    get_booking,
    update_booking,
    delete_booking
)

from controllers.staff_controller import (
    get_all_staff
)

from core.static import serve_static
from core.responses import send_404, send_json
from core.middleware import add_cors_headers


FRONTEND_ROUTES = {
    "/": "frontend/pages/index.html",
    "/schedule": "frontend/pages/schedule.html",
    "/booking": "frontend/pages/booking.html",
    "/staff": "frontend/pages/staff.html"
}


class ReservationRouter(BaseHTTPRequestHandler): 

     # CORS
    def do_OPTIONS(self):
        add_cors_headers(self)
        self.send_response(200)
        self.end_headers()

    def handle_ui_routes(self, path):
        if path in FRONTEND_ROUTES:
            serve_static(self, FRONTEND_ROUTES[path])
            return True
        return False


    # ================= GET =====================
    def do_GET(self):
        add_cors_headers(self)
        parsed = urlparse(self.path)
        path = parsed.path

        # Frontend pages
        if self.handle_ui_routes(path):
            return

        # --- TRAIN API ---
        if path == "/api/trains":
            return send_json(self, get_all_trains())

        if path.startswith("/api/trains/"):
            train_id = path.split("/")[-1]
            return send_json(self, get_train(train_id))

        # --- BOOKING API ---
        if path == "/api/bookings":
            return send_json(self, get_all_bookings())

        if path.startswith("/api/bookings/"):
            booking_id = path.split("/")[-1]
            return send_json(self, get_booking(booking_id))

        # --- STAFF API ---
        if path == "/api/staff":
            return send_json(self, get_all_staff())

        send_404(self)


    # ================= POST (CREATE) =====================
    def do_POST(self):
        add_cors_headers(self)
        parsed = urlparse(self.path)
        path = parsed.path

        # --- CREATE BOOKING ---
        if path == "/api/bookings/create":
            length = int(self.headers["Content-Length"])
            body = self.rfile.read(length).decode()
            data = {k: v[0] for k, v in parse_qs(body).items()}
            return send_json(self, create_booking(data))

        send_404(self)


    # ================= PUT (UPDATE) =====================
    def do_PUT(self):
        add_cors_headers(self)
        parsed = urlparse(self.path)
        path = parsed.path

        if path.startswith("/api/bookings/") and path.endswith("/update"):
            booking_id = path.split("/")[-2]
            length = int(self.headers["Content-Length"])
            body = self.rfile.read(length).decode()
            data = {k: v[0] for k, v in parse_qs(body).items()}
            return send_json(self, update_booking(booking_id, data))

        send_404(self)


    # ================= DELETE (DELETE) =====================
    def do_DELETE(self):
        add_cors_headers(self)
        parsed = urlparse(self.path)
        path = parsed.path

        if path.startswith("/api/bookings/") and path.endswith("/delete"):
            booking_id = path.split("/")[-2]
            return send_json(self, delete_booking(booking_id))

        send_404(self)


   
   