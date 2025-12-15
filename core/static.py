def serve_static(handler, file_path):
    try:
        with open(file_path, "rb") as f:
            content = f.read()

        handler.send_response(200)

        if file_path.endswith(".html"):
            handler.send_header("Content-Type", "text/html")
        elif file_path.endswith(".css"):
            handler.send_header("Content-Type", "text/css")
        elif file_path.endswith(".js"):
            handler.send_header("Content-Type", "application/javascript")
        else:
            handler.send_header("Content-Type", "application/octet-stream")

        handler.end_headers()
        handler.wfile.write(content)
        return True

    except FileNotFoundError:
        handler.send_response(404)
        handler.end_headers()
        handler.wfile.write(b"File not found")
        return False