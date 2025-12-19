# Handlers are responsible for dealing with HTTP details (headers, body, methods)

import json
from core.responses import send_json, send_404
from core.request import parse_json_body
from services.train_service import (
    service_get_all,
    service_get_one,
    service_create,
    service_update,
    service_delete
)


def get_all_trains(handler):
    return send_json(handler, 200, service_get_all())


def get_train(handler, train_id):
    train = service_get_one(train_id)
    return send_json(handler, 200, train) if train else send_404(handler)


def create_train(handler):
    data = parse_json_body(handler)
    new_train = service_create(data)
    return send_json(handler, 201, new_train)


def update_train(handler, train_id):
    data = parse_json_body(handler)
    updated = service_update(train_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)


def delete_train(handler, train_id):
    deleted = service_delete(train_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)