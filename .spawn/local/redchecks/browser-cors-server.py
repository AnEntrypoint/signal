import functools
import http.server
import os
import ssl
import sys
import urllib.parse

SITE_HOST = "anentrypoint.github.io"

class Handler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        if (self.headers.get('Host') or '').split(':')[0] != SITE_HOST:
            self.send_response(http.server.HTTPStatus.NOT_FOUND)
            self.send_header('Content-Length', '0')
            http.server.BaseHTTPRequestHandler.end_headers(self)
            return None
        parts = urllib.parse.urlsplit(self.path)
        if not parts.path.endswith('/') and os.path.isdir(self.translate_path(parts.path)):
            location = urllib.parse.unquote(parts.path) + '/'
            if parts.query:
                location += '?' + parts.query
            self.send_response(http.server.HTTPStatus.MOVED_PERMANENTLY)
            self.send_header('Location', location)
            self.send_header('Content-Length', '0')
            self.end_headers()
            return None
        return super().send_head()

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, *args):
        pass

port = int(sys.argv[1])
root = sys.argv[2]
server = http.server.ThreadingHTTPServer(('127.0.0.1', port), functools.partial(Handler, directory=root))
if len(sys.argv) > 4:
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(sys.argv[3], sys.argv[4])
    server.socket = context.wrap_socket(server.socket, server_side=True, do_handshake_on_connect=False)
server.serve_forever()
