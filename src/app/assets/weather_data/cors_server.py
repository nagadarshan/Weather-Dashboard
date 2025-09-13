from http.server import SimpleHTTPRequestHandler, HTTPServer

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    server = HTTPServer(('localhost', 9000), CORSRequestHandler)
    print('Serving with CORS on port 9000...')
    server.serve_forever()
