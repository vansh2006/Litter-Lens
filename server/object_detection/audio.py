import simpleaudio as sa
import os

audioTracks = []

def loadAudioTracks(): 
    audioFolderPath = r"C:\Users\matia\Documents\LitterLens\server\object_detection\audio"
    # Load every file in the audio folder
    for file in os.listdir(audioFolderPath):
        full_path = os.path.join(audioFolderPath, file)
        print("FILE: ", full_path)
        if os.path.isfile(full_path):
            audioTracks.append(full_path)
        else:
            print(f"File not found: {full_path}")
    return;

def playAudioTrack(track):
    if track < len(audioTracks):
        wave_obj = sa.WaveObject.from_wave_file(audioTracks[track])
        play_obj = wave_obj.play()
        play_obj.wait_done()  # Wait until sound has finished playing
    else:
        print(f"Track {track} not found in audioTracks")
    return; 