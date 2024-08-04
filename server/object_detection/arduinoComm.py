import serial
import requests

# Replace 'COM3' with the correct COM port for your Arduino
ser = serial.Serial('COM3', 9600)

serverIp = "http://localhost:8000"

try:
    print("Arduino connected!")
    while True:
        if ser.in_waiting > 0:  # Check if there's data available to read
            line = ser.readline().decode('utf-8').rstrip()  # Read a line and decode it
            #print(line)  # Output the data to the console
            if ("FILLED" in line):
                print("FILLED!")
                # SEnd post reuqest /setFull to server
                url = serverIp + "/setFull"
                x = requests.get(url)

                if x.status_code == 200:
                    print("Successfully notified server.")
                else:
                    print(f"Failed to notify server. Status code: {x.status_code}")


            elif ("EMPTY" in line):
                url = serverIp + "/setEmpty"
                x = requests.get(url)

                if x.status_code == 200:
                    print("Successfully notified server.")
                else:
                    print(f"Failed to notify server. Status code: {x.status_code}")

                print("NOT FILLED")
except KeyboardInterrupt:
    print("Program interrupted")
finally:
    ser.close()  # Ensure the serial port is closed when done