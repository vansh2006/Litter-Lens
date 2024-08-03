import serial
import asyncio
import websockets

# Initialize serial connection (adjust '/dev/ttyUSB0' to your serial port and baudrate)
ser = serial.Serial('/dev/ttyUSB0', 9600)

async def send_data(websocket, path):
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            await websocket.send(line)
        await asyncio.sleep(0.1)

start_server = websockets.serve(send_data, "localhost", 6789)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
