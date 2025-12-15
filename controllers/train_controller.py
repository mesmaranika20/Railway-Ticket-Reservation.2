from core.responses import send_json,send_404
from config import TRAINS_DATA

# GET /trains
def get_all_trains(handler):
    return send_json(handler, 200, TRAINS_DATA)

#GET /trains/{id}
def get_train(handler, train_id):
    for train in TRAINS_DATA:
        if train["id"] == train_id:
            return send_json(handler, 200,train)
        return send_404(handler)