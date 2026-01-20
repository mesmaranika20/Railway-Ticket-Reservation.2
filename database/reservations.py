from datetime import datetime
from .connection import get_connection


def reservations_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM reservations ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def reservations_get_one(reservation_id: int):
    conn = get_connection()
    row = conn.execute("SELECT * FROM reservations WHERE id = ?", (reservation_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def reservations_create(data: dict):
    """
    Expected data:
      - train_id (int)
      -booking_id (int) 
      -staff_id (int) 
      - reserved_on (optional)
      """
    conn = get_connection()
    now = datetime.now().isoformat()
    reserved_on = data.get("reserved_on") or now

    cur = conn.execute(
        "INSERT INTO reservations (train_id, booking_id,staff_id, reserved_on, created_at) VALUES (?, ?, ?, ?, ?)",
        (data["train_id"], data["booking_id"],data["staff_id"], reserved_on, now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return reservations_get_one(new_id)

def  reservations_delete(reservation_id: int):
    reservation = reservations_get_one(reservation_id)
    if not reservation:
       return None
    
    conn = get_connection()
    conn.execute("DELETE FROM reservations WHERE id=?", (reservation_id,))
    conn.commit()
    conn.close()
    return reservation




