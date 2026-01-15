from core.responses import send_json, send_404
from core.request import parse_json_body
from services.reservation_service import (
    service_get_all,
    service_get_one,
    service_create,
    service_delete
)

def get_all_reservations(handler):
    return send_json(handler, 200, service_get_all())

def get_reservation(handler, reservation_id):
    reservation = service_get_one(reservation_id)
    return send_json(handler, 200, reservation) if reservation else send_404(handler)

def create_reservation(handler):
    data = parse_json_body(handler)
    new_reservation = service_create(data)
    return send_json(handler, 201, new_reservation)

def delete_reservation(handler, reservation_id):
    deleted = service_delete(reservation_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)