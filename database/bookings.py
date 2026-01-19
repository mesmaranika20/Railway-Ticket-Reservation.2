# Actual SQL queries — Create, Read, Update, Delete (CRUD)

from datetime import datetime
from .connection import get_connection


def db_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM bookings ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def db_get_one(booking_id):
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM bookings WHERE id = ?", (booking_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def db_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        """
        INSERT INTO bookings
        (passenger_name, coach_number, booking_date, total_seats , payment , created_at)
        VALUES (?, ?, ?, ?,?,?)
        """,
        (
            
            data["passenger_name"],
            data["coach_number"],
            data["booking_date"],
            data["total_seats"],
            data["payment"],
            now,
        )
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)


def db_update(booking_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute(
        """
        UPDATE bookings
        SET passenger_name=?, coach_number=?, booking_date=?,total_seats=? , payment=? , updated_at=?
        WHERE id=?
        """,
        (
            
            data["passenger_name"],
            data["coach_number"],
            data["booking_date"],
            data["total_seats"],
            data["payment"],
            now,
            booking_id,
        )
    )
    conn.commit()
    conn.close()
    return db_get_one(booking_id)


def db_delete(booking_id):
    booking = db_get_one(booking_id)
    if not booking:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM bookings WHERE id=?", (booking_id,))
    conn.commit()
    conn.close()
    return booking



    
