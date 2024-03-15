# Boss Master
An Android/IOs app designed to aid and assist scoring in Archery

https://archerygb.org/news/archery-apps

## Features (*P* - Premium)
* Enter session scores
* Do a practice session
* Pick from available competitions
* Share results of competition
* *P* AI analysis
* *P* Performance Analysis
* Generate graphs for a session or based on historical data
* *P* Club - Could clubs have a fee?
* *P* Share club results

## Unique Selling Point(s)
AI Image Analysis. Taking pictures of the target with your arrows in it will analyse the results via AI and input them in as a score. No other app out there seems to do this

Join a club. A club allows sharing of results between one another. When you complete  a competition it can send a scorecard to the organiser.

## MVP
* Create a new session.
* Manually enter scores
* Tap to score. Must be an interactive boss. Consider line breakears
* Take picture of score (AI is not part of MVP)
* R/View a session
* Update details of a session
* Delete a session
* View history of sessions, filter by type i.e. practice/competition

## Market Research
MyTargets Archery appears to be the biggest one out there. It offers the ability to tap a target when entering scores which was something I was keen on doing. The user interface looks somewhat old. It was last updated 24 Jan 2024, though I can’t see the scale of the update. There are 100k+ downloads.

## Feature Behavior
### Sessions
This is when a user is going to be shooting. 

#### Create Session
First they’ll need to fill out some details about the session they’re about to complete. This will determine how many arrows they shoot per end, and the type/name/date etc. At this point they should probably choose whether or not they’re sharing a boss as AI may not be able to work on a shared boss. 

* Choose bow used
* Face type
* Name
* Competition Type
* Arrows per end (if practice)
* Rounds/Distance (if practice)

The ability to save a session as a preset would be good so they don’t need to keep coming back to recreate the above.

#### Session In Progress
They’ll be shooting at this point. The session should save as in progress/draft as each score is entered in case the app was to crash. This needs to be saved locally as there may not be any reception. AI Analysis/Model will therefore need to be hosted within the app itself to have offline access.

This should be as simple as possible. Whilst the session is in progress the user should be able to enter scores from fired arrows in the following way:
Manually type score into card

Tapping on an interactive boss face (this should match the competition boss face type)

AI Image generation (user should be able to override results manually if it gets one wrong)

### Profile
A page about the user

#### Equipment
* Add pictures of your bow(s)
* List equipment in free-form text boxes
* Draw weight
* Arrow length, spine type etc
* Share with others?

## Storage
I want to utilise combined storage where some data is stored in the cloud and some data is stored on the device.

### Cloud
* Club and Shared data. Any data that is ‘shared’ or sent to a club
* *P* Cloud Backed up score data

### Local
Your scores and history

## Hosting
Firebase is capable of hosting if we went with that stack.

## Tech Stack
The technology stack should support iOS and Android. It would be foolish to eliminate one of these despite my own preferences. Problems will arise when debugging an iOS environment due to me not having an Android device. If I do only support one platform then it should be considered that if an organizer of a competition is using the app they should be able to manually enter scores too for non app users.

### Front End
#### React Native
Supports IOS, Android and Windows. React is a good technology to use due to its popularity.
React Native in 100 Seconds


### Back End
C# Is typically my go to and I’ll probably do the same here though Kotlin is a lot more popular in the Android world nowadays. I need to do some research on how mobile apps are built as there’s backing code behind the front end and then there’s actual server side code which for my purposes will only be used for the cloud/storage side.

#### Expo

https://expo.dev/

https://docs.expo.dev/guides/using-firebase/#using-react-native-firebase

#### Firebase
https://firebase.google.com/

Google’s mobile development platform. Looks straightforward to use and can be accessed with a google account which I already have, though I may want a business one setting up.

Offers the following:
* Authentication
* Storage

##### Resources
React Native Tutorial for Beginners - Build a React Native App
What is Firebase?

### AI Image Recognition
Amazon Rekognition: https://aws.amazon.com/rekognition/pricing/

## Source Control
Repository can be found [here](https://github.com/MrZeeba/boss-master)

## Sales Strategy
* Use Leek Archery Club as test users
* Contact Archery GB to get added to https://archerygb.org/news/archery-apps

## Terminology
* Session - A competition, or shooting session. This could be simply someone practicing and keeping track of their scores.
* Session Type - Is this a competition, or a practice session

## Tasks

### Research
The rest of the document will populated as a result of these research tasks rather than answering them here

* [ ] App architecture.
* [ ] If we have React Native in the front, where does the C# code sit?
* [ ] What would a server be used for? 
* [ ] What responsibilities would it have?
* [ ] Presumably storage
* [ ] Club related things (API style)
* [ ] Which server provider? (I’m thinking AWS Free tier for now)
* [ ] AI tools for image recognition
* [ ] How is a model trained?
* [ ] Can it be used offline
* [ ] What is Expo, people have mentioned this a few times with React Native.

### Scaffolding
* [x] Create a Git Repository
* [ ] Choose & setup an IDE