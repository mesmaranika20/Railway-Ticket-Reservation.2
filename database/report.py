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
            t.departure_time AS train_departure_time,
            t.arrival_time AS train_arrival_time,
                        
            b.id AS booking_id,
            b.passenger_name AS booking_passenger_name,
            b.coach AS booking_coach_number,
            b.booking AS booking_booking_date,            
            b.total_seats AS booking_total_seats,
            b.payment AS booking_payment,
                        
            s.name AS staff_name,
            s.role AS staff_role,
            s.contact AS staff_contact      
                        
         FROM reservations r
         JOIN trains t ON t.id = r.train_id
         JOIN staff s ON s.id = r.staff_id                
         JOIN bookings b ON b.id = r.booking_id
        ORDER BY r.id DESC;
     """).fetchall()
    conn.close()
    return [dict(r) for r in rows]