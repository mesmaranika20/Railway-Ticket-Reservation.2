# Opens a connection to SQLite and returns it for DB operations

import sqlite3

DB_FILE = "railway.db"


def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def _column_exists(conn, table, column):
    cols = conn.execute(f"PRAGMA table_info({table})").fetchall()
    return any(c["name"] == column for c in cols)


def init_database():
    conn = get_connection()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS trains (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            train_name TEXT,
            source TEXT,
            destination TEXT,
            departure_time TEXT,
            arrival_time TEXT,
            created_at TEXT,
            updated_at TEXT
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            passenger_name TEXT,
            coach_number TEXT,
            booking_date TEXT,
            payment INTEGER,
            total_seat INTEGER, 
            created_at TEXT,
            updated_at TEXT
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS staff (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            role TEXT,
            contact TEXT,
            created_at TEXT,
            updated_at TEXT
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS reservations (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              train_id INTEGER NOT NULL,
               booking_id INTEGER NOT NULL,
                staff_id INTEGER NOT NULL,
                reserved_on TEXT,
                created_at TEXT,
                updated_at TEXT,
                FOREIGN KEY(train_id) REFERENCES trains(id),
<<<<<<< HEAD
                FOREIGN KEY(booking_id) REFERENCES bookings(id),
                 FOREIGN KEY(staff_id) REFERENCES staff(id)
=======
                FOREIGN KEY(booking_id) REFERENCES bookings(id)
                FOREIGN KEY(satff_id) REFERENCE satff(id)
>>>>>>> bd295e376fa216c034bc31a9854e18995234de50
        )
    """)

    conn.commit()
    conn.close()
    print("✓ Database initialized")
