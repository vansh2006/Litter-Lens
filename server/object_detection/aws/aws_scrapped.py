import boto3
import os
from dotenv import load_dotenv
import cv2
from pymongo import MongoClient
import datetime

load_dotenv()

# create a stream name
stream_name = 'litter-stream'

aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
aws_region = os.getenv('AWS_REGION')
print(f"AWS_ACCESS_KEY_ID: {aws_access_key_id}")
print(f"AWS_SECRET_ACCESS_KEY: {aws_secret_access_key}")
print(f"AWS_REGION: {aws_region}")

# create a kinesis video client
kinesis = boto3.client('kinesisvideo',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=aws_region)

endpoint = kinesis.get_data_endpoint(
    APIName='GET_HLS_STREAMING_SESSION_URL',
    StreamName=stream_name
)['DataEndpoint']

# Get the Stream URL
kvam = boto3.client('kinesis-video-archived-media', endpoint_url=endpoint, region_name=aws_region)
# Get the HLS Stream URL from the GetMedia API
url = kvam.get_hls_streaming_session_url(
    StreamName=stream_name,
    PlaybackMode='LIVE'
)['HLSStreamingSessionURL']

video = cv2.VideoCapture(url)

#Store URL into MongoDB Atlas Database
client = MongoClient('mongodb+srv://kershanarulneswaran:bitterbens@littercluster.fg8lf.mongodb.net/?retryWrites=true&w=majority&appName=LitterCluster')
db = client['litterdb']
collection = db['streams']

document = {
    'name': 'Trash1',
    'location': 'University of Toronto',
    'url': url,
}

# Add to MongoDB
collection.insert_one(document)
print('URL added to MongoDB')


# Loop over the frames of the video
while True:
    # Initialize the "first frame" which is intended to be a blank frame
    # There must be no objects right now
    frame = vs.read()
    if video_source is not None:
        frame = frame[1]  # Extract a frame from video capture

    text = "No trash"

    # If no camera available still, quit/break
    if frame is None:
        break

    # Pre-process the images
    # Resize the frame, convert it to grayscale, and blur it
    frame = imutils.resize(frame, width=500)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (21, 21), 0)

    # If the first frame is None, initialize it
    if first_frame is None:
        first_frame = gray
        continue

    # Compute absolute difference between first and current frame
    frame_delta = cv2.absdiff(first_frame, gray)

    # VERY IMPORTANT, DON'T UNDERSTAND BUT DON'T TOUCH
    thresh = cv2.threshold(frame_delta, 55, 180, cv2.THRESH_BINARY)[1]

    # Dilate the "threshold" to fill in holes, find contours on the images
    thresh = cv2.dilate(thresh, None, iterations=4)
    cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)

    # Loop over the contours
    for c in cnts:
        # If contour is too small, ignore
        if cv2.contourArea(c) < min_area:
            continue

        # Compute the bounding box, draw it, and update the text
        (x, y, w, h) = cv2.boundingRect(c)
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        text = "Trash in Frame"

    # Draw the text and timestamp on the frame
    cv2.putText(frame, "Litter Status: {}".format(text), (10, 20),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
    cv2.putText(frame, datetime.datetime.now().strftime("%A %d %B %Y %I:%M:%S%p"),
                (10, frame.shape[0] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 255), 1)

    cv2.imshow("Security Feed", frame)
    cv2.imshow("Thresh", thresh)
    cv2.imshow("Frame Delta", frame_delta)

    # Send frame to AWS Kinesis Video Stream
    try:
        print("sdfsdfsdfs")
    except Exception as e:
        print(f"Error sending frame to Kinesis Video Stream: {e}")

    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
        break

# Cleanup the camera and close any open windows
if video_source is None:
	vs.stop()
else:
	vs.release()
cv2.destroyAllWindows()
