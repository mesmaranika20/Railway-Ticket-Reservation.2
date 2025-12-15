# Contains business logic (validation, processing, rules)
# Does NOT know about HTTP — only works with Python data

from database.queries import (
    db_get_all_bookings,
    db_get_one_booking,
    db_create_booking,
    db_update_booking,
    db_delete_booking
)

def service_get_all():
    return db_get_all_bookings()

def  service_get_one(booking_id):
    return db_get_one_booking(booking_id)

def service_create(data):
    return db_create_booking(data)

def service_update(booking_id, data):
    return db_update_booking(booking_id, data)

def service_delete(booking_id):
    return db_delete_booking(booking_id)