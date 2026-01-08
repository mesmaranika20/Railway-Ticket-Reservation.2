# Handlers are responsible for dealing with HTTP details (headers, body, methods)

import json
from core.responses import send_json, send_404
from core.request import parse_json_body
from services.booking_service import (
    service_get_all,
    service_get_one,
    service_create,
    service_update,
    service_delete
)


def get_all_bookings(handler):
    return send_json(handler, 200, service_get_all())


def get_booking(handler, booking_id):
    booking = service_get_one(booking_id)
    return send_json(handler, 200, booking) if booking else send_404(handler)


def create_booking(handler):
    data = parse_json_body(handler)
    new_booking = service_create(data)
    return send_json(handler, 201, new_booking)


def update_booking(handler, booking_id):
    data = parse_json_body(handler)
    updated = service_update(booking_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)


def delete_booking(handler, booking_id):
    deleted = service_delete(booking_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)