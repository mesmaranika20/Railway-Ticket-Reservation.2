import json

def send_json(handler, status, data):
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json")
    handler.end_headers()

    handler.wfile.write(json.dumps(data).encode())
    return True


def send_404(handler):
    handler.send_response(404)
    handler.send_header("Content-Type", "application/json")
    handler.end_headers()
    handler.wfile.write(json.dumps({"error": "Not Found"}).encode())
    return False