
import pygame
import os
import random

# Initialize Pygame
pygame.init()

# Function to play a random soundtrack
def play_random_soundtrack(directory):

    # List all mp3 files in the directory
    audio_files = [os.path.join(directory, file) for file in os.listdir(directory) if file.endswith('.mp3')]

    print (audio_files)

    if audio_files:
        random_file = random.choice(audio_files)
        pygame.mixer.music.load(random_file)
        pygame.mixer.music.play()
        

