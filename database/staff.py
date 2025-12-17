# Actual SQL queries — Create, Read, Update, Delete (CRUD)

from datetime import datetime
from .connection import get_connection


def db_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM staff ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def db_get_one(staff_id):
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM staff WHERE id = ?", (staff_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def db_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        """
        INSERT INTO staff
        (name, role, contact, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (
            data["name"],
            data["role"],
            data["contact"],
            now,
        )
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)


def db_update(staff_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute(
        """
        UPDATE staff
        SET name=?, role=?, contact=?, updated_at=?
        WHERE id=?
        """,
        (
            data["name"],
            data["role"],
            data["contact"],
            now,
            staff_id,
        )
    )
    conn.commit()
    conn.close()
    return db_get_one(staff_id)


def db_delete(staff_id):
    staff = db_get_one(staff_id)
    if not staff:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM staff WHERE id=?", (staff_id,))
    conn.commit()
    conn.close()
    return staff