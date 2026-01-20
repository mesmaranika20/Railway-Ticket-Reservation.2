from datetime import datetime
from .connection import get_connection


def reservation_report():
    """
    Returns joined rows: reservation + train name + booking name
    """
    conn = get_connection()
    rows = conn.execute("""
         SELECT
            r.id AS reservation_id,
            r.reserved_on,
            t.id AS train_id,
            t.train_name AS train_name,
            t.source AS train_source,
            t.destination AS train_destination,
            b.id AS booking_id,
            b.passenger_name AS booking_passenger_name
         FROM reservations r
        JOIN trains t ON t.id = r.train_id
         JOIN bookings b ON b.id = r.booking_id
         JOIN staff b ON b.id = r.staff_id
        ORDER BY r.id DESC;
     """).fetchall()
    conn.close()
    return [dict(r) for r in rows]
