from .connection import get_connection


# ----------------------------
#   TRAIN QUERIES (READ ONLY)
# ----------------------------

def db_get_all_trains():
    conn = get_connection()
    trains = conn.execute("SELECT * FROM trains").fetchall()
    conn.close()
    return trains


def db_get_train(train_id):
    conn = get_connection()
    train = conn.execute(
        "SELECT * FROM trains WHERE id = ?", (train_id,)
    ).fetchone()
    conn.close()
    return train


# ----------------------------
#         STAFF QUERIES
# ----------------------------

def db_get_all_staff():
    conn = get_connection()
    staff = conn.execute("SELECT * FROM staff").fetchall()
    conn.close()
    return staff


# ----------------------------
#     BOOKINGS (FULL CRUD)
# ----------------------------

def db_get_all_bookings():
    conn = get_connection()
    bookings = conn.execute("SELECT * FROM bookings").fetchall()
    conn.close()
    return bookings


def db_get_one_booking(booking_id):
    conn = get_connection()
    booking = conn.execute(
        "SELECT * FROM bookings WHERE id = ?",
        (booking_id,)
    ).fetchone()
    conn.close()
    return booking


def db_create_booking(data):
    conn = get_connection()
    cursor = conn.execute(
        """
        INSERT INTO bookings (user_id, train_id, seats)
        VALUES (?, ?, ?)
        """,
        (data["user_id"], data["train_id"], data["seats"])
    )
    conn.commit()

    new_id = cursor.lastrowid
    conn.close()
    return new_id


def db_update_booking(booking_id, data):
    conn = get_connection()
    conn.execute(
        """
        UPDATE bookings
        SET user_id = ?, train_id = ?, seats = ?
        WHERE id = ?
        """,
        (data["user_id"], data["train_id"], data["seats"], booking_id)
    )
    conn.commit()
    conn.close()
    return True


def db_delete_booking(booking_id):
    conn = get_connection()
    conn.execute(
        "DELETE FROM bookings WHERE id = ?",
        (booking_id,)
    )
    conn.commit()
    conn.close()
    return True