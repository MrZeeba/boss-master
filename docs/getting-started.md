# Getting Started

## Start Debugging
To start the metro server you can run. Metro bundles all of our files into a single `.js` executable.

`npm start`

OR 

`npx expo start`

You can now access the exposed URL on a mobile device to hit the web version, or on the PC to hit a browser version.

### iOS
You cannot install app's on a simulated Apple device. For this reason the source code must be available on the Macbook to be able to debug and connect to the application. You'll need to pull the source code.

This requires an iOS device. In my case I'm using my work Macbook. You need XCode installed which provides emulation.

1. Open XCode
2. (Optional) Window > Devices and Simulators. This allows us to configure available simulators
3. XCode > Open Developer Tool > Simulator

> TIP: You can change simulator in the Device menu at the top. I'm sticking to the iPhone 15 for now

### Android
There are two ways to connect to the app. Either via an emulated device or my actual phone.

#### Emulated
Android Studio offers emulation functionality.
1. Open Android Studio
2. More Actions > Virtual Device Manager
2. Select a phone and click the play/run icon

#### Phone Handset
You can either hit the URL in a web browser to get a browser version. Or use the Expo play store app.

#### via Browser
Just open a browser and hit the IP

#### via the App
1. Open the Expo App
2. Scan the QR code provided

### iOS