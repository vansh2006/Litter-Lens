import serial

# Replace 'COM3' with the correct COM port for your Arduino
ser = serial.Serial('COM5', 9600)

try:
    while True:
        if ser.in_waiting > 0:  # Check if there's data available to read
            line = ser.readline().decode('utf-8').rstrip()  # Read a line and decode it
            # print(line)  # Output the data to the console
            if ("FILLED" in line):
                print("FILLED!")
            elif ("EMPTY" in line):
                print("NOT FILLED")
except KeyboardInterrupt:
    print("Program interrupted")
finally:
    ser.close()  # Ensure the serial port is closed when done
