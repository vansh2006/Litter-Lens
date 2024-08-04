import os
import subprocess
import threading

def run(command, directory):
    # Change directory to the specified directory
    os.chdir(directory)
    # Run the command
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return process

def monitor_process(process, name):
    output, error = process.communicate()
    print(f"Output from {name}:", output)
    print(f"Error from {name}:", error)

# Start both scripts in parallel
process1 = run("python cam.py", "./")
process2 = run("python cam2.py", "./")
process3 = run("python arduinoComm.py", "./")

# Create threads to monitor the processes
thread1 = threading.Thread(target=monitor_process, args=(process1, "cam.py"))
thread2 = threading.Thread(target=monitor_process, args=(process2, "cam2.py"))
thread3 = threading.Thread(target=monitor_process, args=(process3, "arduinoComm.py"))


# Start the threads
thread1.start()
thread2.start()
thread3.start()

# Wait for both threads to complete
thread1.join()
thread2.join()
thread3.join()
