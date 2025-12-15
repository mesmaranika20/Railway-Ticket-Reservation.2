from core.responses import send_json, send_404
from config import STAFF_DATA

# GET /staff
def get_all_staff(handler):
    return send_json(handler, 200, STAFF_DATA)

# GET /staff/{id}
def get_staff(handler, staff_id):
    for staff in STAFF_DATA:
        if staff["id"] == staff_id:
            return send_json(handler,200,staff)
        return send_404(handler)