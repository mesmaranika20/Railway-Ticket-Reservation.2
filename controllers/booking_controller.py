from core.responses import send_json,send_404
from core.request import parse_json_body
from services.booking_service import (
    service_get_all,
    service_get_one,
    service_create,
    service_update,
    service_delete
)

# GET /booking
def get_all_bookings(handler):
    bookings = service_get_all()
    return send_json(handler, 200, bookings)

# GET /booking/{id}
def get_booking(handler, booking_id):
    booking = service_get_one(booking_id)
    return send_json(handler, 200,booking) if booking else send_404(handler)

# POST /bookings
def create_booking(handler):
    data = parse_json_body(handler)
    new_booking = service_create(data)
    return send_json(handler, 201, new_booking)

# PUT /bookings/{id}
def update_booking(handler, booking_id):
    data = parse_json_body(handler)
    updated_booking = service_update(booking_id, data)
    return send_json(handler, 200, update_booking) if updated_booking else send_404(handler)

# DELETE /booking/{id}
def delete_booking(handler, booking_id):
    deleted = service_delete(booking_id)
    return send_json(handler, 200, {"message": "Booking deleted"}) if deleted else send_404(handler)