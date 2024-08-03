from ultralytics import YOLO
import cv2
import cvzone
import simpleaudio as sa
import os

audioTracks = []


# AUDIO PLAYING STUFF
def loadAudioTracks():  
    audioFolderPath = r"C:\Users\matia\Documents\LitterLens\server\object_detection\audio"
    # Load every file in the audio folder
    for file in os.listdir(audioFolderPath):
        full_path = os.path.join(audioFolderPath, file)
        print("FILE: ", full_path)
        if os.path.isfile(full_path):
            audioTracks.append(full_path)

def playAudioTrack(track):
    if track < len(audioTracks):
        wave_obj = sa.WaveObject.from_wave_file(audioTracks[track])
        play_obj = wave_obj.play()

loadAudioTracks()
playAudioTrack(0)


# camera stuff
print("Starting camera...")
cap = cv2.VideoCapture(2)
cap.set(3,640)
cap.set(4,480)

print("Starting YOLO model...")
model = YOLO(r"C:\Users\matia\Documents\LitterLens\yolov8n.pt") #needs path to taco model

while True:
    print("TEST!")
    success, img = cap.read()
    results = model(img, stream=True)
    for r in results:
        boxes = r.boxes
        for box in boxes:
            cls = int(box.cls[0])
            conf = float(box.conf[0])
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            w, h = x2 - x1, y2 - y1
            
            cvzone.cornerRect(img, (x1, y1, w, h))
            cvzone.putTextRect(img, f'{class_names[cls]} {conf:.2f}', (max(0, x1), max(35, y1)), scale=1, thickness=1)

    cv2.imshow("Image", img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
