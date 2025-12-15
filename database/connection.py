import sqlite3

DB_FILE = "railway.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row   # returns rows as dict-like objects
    return conn


def init_database():
    conn = get_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT
        );
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS trains (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            source TEXT,
            destination TEXT,
            available_seats INTEGER
        );
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            train_id INTEGER,
            seats INTEGER,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(train_id) REFERENCES trains(id)
        );
    """)

    conn.commit()
    conn.close()
    print("✔ Database initialized")