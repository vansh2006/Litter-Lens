import serial
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import threading

# Initialize serial connection (adjust 'COM3' to your serial port and baud rate)
ser = serial.Serial('COM3', 9600)  # Replace 'COM3' with your actual COM port

# Store the last status value
status = None

class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        global status
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        status = json.loads(post_data.decode('utf-8'))['status']
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        global status
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'status': status}).encode('utf-8'))

def read_serial_data():
    global status
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            try:
                data = json.loads(line)
                status = data.get('status', None)
            except json.JSONDecodeError:
                pass

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    # Start serial reading in a separate thread
    serial_thread = threading.Thread(target=read_serial_data)
    serial_thread.daemon = True
    serial_thread.start()
    
    # Start HTTP server
    run()
