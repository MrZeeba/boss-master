
# Tech Stack
The technology stack should support iOS and Android. It would be foolish to eliminate one of these despite my own preferences. Problems will arise when debugging an iOS environment due to me not having an Android device. If I do only support one platform then it should be considered that if an organizer of a competition is using the app they should be able to manually enter scores too for non app users.

## Front End
### React Native
Supports IOS, Android and Windows. React is a good technology to use due to its popularity.
React Native in 100 Seconds


## Back End
C# Is typically my go to and I’ll probably do the same here though Kotlin is a lot more popular in the Android world nowadays. I need to do some research on how mobile apps are built as there’s backing code behind the front end and then there’s actual server side code which for my purposes will only be used for the cloud/storage side.

### Expo

https://expo.dev/

https://docs.expo.dev/guides/using-firebase/#using-react-native-firebase

### Firebase
https://firebase.google.com/

Google’s mobile development platform. Looks straightforward to use and can be accessed with a google account which I already have, though I may want a business one setting up.

Offers the following:
* Authentication
* Storage
* Hosting for API?

#### Resources
React Native Tutorial for Beginners - Build a React Native App
What is Firebase?

## Testing Framework
It's important to start with a test driven development approach to ensure my code has good coverage. I need to investigate mocking frameworks for React Native. 

https://reactnative.dev/docs/testing-overview

Mocking is the process of providing a pre-canned result from a method. I will do this through the use of a mocking framework. In the document linked above, React Native specifically mentions that [Jest](https://jestjs.io/docs/mock-functions#mocking-modules) has mocking built in.
