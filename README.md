# Litter Lens (formerly Trash Talk) (HT6)

## Inspiration
How many times have you been walking around the city and seen trash on the ground, sometimes just centimetres away from a trash can? It can be very frustrating to see people who either have no regard for littering, or just have horrible aim. This is what inspired us to create TrashTalk: trash talk for your trash shots.

## What it does
When a piece of garbage is dropped on the ground within the camera’s field of vision, a speaker loudly hurls insults until the object is picked up. Because what could motivate people to pick up after themselves more than public shaming? Perhaps the promise of a compliment: once the litter is picked up, the trash can will deliver praise, designed to lift the pedestrian’s heart.

The ultrasonic sensor attached to the rim of the can will send a ping to the server when the trash can becomes full, thus reducing litter by preventing overfilling, as studies have shown that programmed encouragement as opposed to regular maintenance can reduce littering by as much as 25%. On the website, one can view the current 'full' status of the trash can, how much trash is currently inside and outside the can in a bar graph, and how many pieces of trash have been scanned total. This quantifies TrashTalk's design to drastically reduce littering in public areas, with some nice risk and reward involved for the participant.

## How we built it
We build this project using NEXT.js, Python, MongoDB, and the Express library integrated together using HTTP requests to send data to and from the Arduino, computer, and end-user. 

Our initial idea was made quite early on, but as we ran into challenges, the details of the project changed over time in order to reflect what we could realistically accomplish in one hackathon. 

We split up our work so we could cover more ground: Abeer would cover trash detection using AI models that could be run on a Raspberry Pi, Kersh would handle the MongoDB interaction, Vansh would help create the Arduino Logic, and Matias would structure the project together. 

## Challenges we ran into
We ran into _quite_ a few challenges making TrashTalk, and a lot of them had to do with the APIs that we were using for OpenCV. The first major issue was that we were not able to get Raspberry Pi running, so we migrated all the code onto one of our laptops. 

Furthermore, none of the pretrained computer vision models we tried to use to recognize trash would work. We realized with the help of one of the mentors that we could simply use an object detection algorithm, and it was smooth sailing from there.

## Accomplishments that we're proud of
- Getting a final working product together 
- Being able to demo to people at the hackathon
- Having an interactive project 

## What we learned
We learned so many things during this hackathon due to the varying experience levels in our team. Some members learned how to integrate GitHub with VSCode, while others learned how to use Next.js (SHOUTOUT TO FREDERIC) and motion detection with OpenCV.

## What's next for TrashTalk
The next steps for TrashTalk would be to have more advanced analytics being run on each trash can. If we aim to reduce litter through the smart placement of trashcans along with auditory reminders, having a more accurate kit of sensors, such as GPS, weight sensor, etc. would allow us to have a much more accurate picture of the trash can's usage. The notification of a trash can being full could also be used to alert city workers to optimize their route and empty more popular trash cans first, increasing efficiency.

https://devpost.com/software/trashtalk-c3wix9

## Getting Started (MVP)
1. Clone the repository.
2. Install node.js, express.js, opencv, pygame, pyserial, serial and requests if you don't have it installed yet.
3. Make sure you have 2 webcams and an Arduino Uno. Both webcams should be facing the same direction at different sides of the can. The Arduino should be between both cameras but should still be on the rim.
4. Connect them via a USB splitter and connect it to your computer.
5. Run node server.js and python runner.py.
