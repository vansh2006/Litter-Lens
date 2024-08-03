import boto3
import cv2

# create a stream name
stream_name = 'litter-stream'

# create a kinesis video client
kinesis = boto3.client('kinesisvideo', region_name='us-east-1')

endpoint = kinesis.get_data_endpoint(
    APIName='GET_HLS_STREAMING_SESSION_URL',
    StreamName=stream_name
)['DataEndpoint']

# Get the Stream URL
kvam = boto3.client('kinesis-video-archived-media', endpoint_url=endpoint)
# Get the HLS Stream URL from the GetMedia API
url = kvam.get_hls_streaming_session_url(
    StreamName=stream_name,
    PlaybackMode='LIVE'
)['HLSStreamingSessionURL']

video = cv2.VideoCapture(url)

while True:
    ret, frame = video.read()
    if not ret:
        break
    cv2.imshow('frame', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video.release()
cv2.destroyAllWindows()

