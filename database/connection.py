# Opens a connection to SQLite and returns it for DB operations

import sqlite3

DB_FILE = "railway.db"


def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def init_database():
    conn = get_connection()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS trains (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            train_name TEXT,
            source TEXT,
            destination TEXT,
            departure_time INTEGER,
            arrival_time INTEGER,
            created_at TEXT,
            updated_at TEXT
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            train_id INTEGER,
            passenger_name TEXT,
            seat_number INTEGER ,
            booking_date INTEGER ,
            created_at TEXT,
            updated_at TEXT
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS staff (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            role TEXT,
            contact INTEGER,
            created_at TEXT,
            updated_at TEXT
        )
    """)

    conn.commit()
    conn.close()
    print("✓ Database initialized")