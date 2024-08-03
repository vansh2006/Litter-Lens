from pymongo import MongoClient
from gridfs import GridFS
import cv2
import io

client = MongoClient('mongodb+srv://kershanarulneswaran:bitterbens@littercluster.fg8lf.mongodb.net/?retryWrites=true&w=majority&appName=LitterCluster')
db = client['LitterCluster']
fs = GridFS(db)

# Open the webcam
videocap = cv2.VideoCapture(0) #webcam

while True:
    ret, frame = videocap.read()
    if not ret:
        break
    
    # JPEG
    is_success, buffer = cv2.imencode(".jpg", frame)
    if not is_success:
        continue
    
    # Convert buffer to binary
    frame_binary = buffer.tobytes()
    
    # Store frame in GridFS
    fs.put(frame_binary, content_type='image/jpeg', filename='frame.jpg')
    
    # Display the frame (optional)
    cv2.imshow('Webcam', frame)
    
    # Break loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close windows
videocap.release()
cv2.destroyAllWindows()