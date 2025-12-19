# Actual SQL queries — Create, Read, Update, Delete (CRUD)

from datetime import datetime
from .connection import get_connection


def db_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM trains ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def db_get_one(train_id):
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM trains WHERE id = ?", (train_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def db_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        """
        INSERT INTO trains
        (train_name, source, destination, departure_time, arrival_time, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            data["train_name"],
            data["source"],
            data["destination"],
            data["departure_time"],
            data["arrival_time"],
            now
        )
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)


def db_update(train_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute(
        """
        UPDATE trains
        SET train_name=?, source=?, destination=?, departure_time=?, arrival_time=?, updated_at=?
        WHERE id=?
        """,
        (
            data["train_name"],
            data["source"],
            data["destination"],
            data["departure_time"],
            data["arrival_time"],
            now,
            train_id,
        )
    )
    conn.commit()
    conn.close()
    return db_get_one(train_id)


def db_delete(train_id):
    train = db_get_one(train_id)
    if not train:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM trains WHERE id=?", (train_id,))
    conn.commit()
    conn.close()
    return train