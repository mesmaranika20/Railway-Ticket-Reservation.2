import json
def parse_json_body(handler):
    content_length = int(handler.headers.get("conent-Length",0))
    if content_length ==0:
        return None
    
    body = handler.rfile.read(content_length)
    try:
        return json.loads(body)
    except:
        return  None