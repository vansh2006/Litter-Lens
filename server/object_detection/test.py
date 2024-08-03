from playsound import playsound
import random
import os

# Directory containing the audio files
audio_directory = 'path_to_your_audio_files'

# List all mp3 files in the directory
audio_files = [os.path.join(audio_directory, file) for file in os.listdir(audio_directory) if file.endswith('.mp3')]

# Function to play a random soundtrack
def play_random_soundtrack():
    if audio_files:
        random_file = random.choice(audio_files)
        playsound(random_file)

# Example usage
play_random_soundtrack()
