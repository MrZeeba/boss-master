# Getting Started

- [Debugging](#debugging)
- [Package Scripts](#package-scripts)

## Debugging

To start the metro server you can run. Metro bundles all of our files into a single `.js` executable.

`npm start`

OR

`npx expo start`

You can now access the exposed URL on a mobile device to hit the web version, or on the PC to hit a browser version.

### Line Debugging

On the emulated device open the developer panel and

1. Select Debug Remote JS.
2. This will open a Chrome browser which our remote debugging will use.
3. Open developer tools `F12`
4. Go to the Sources tab
5. Tick "Pause on caught exceptions" this can be found in the Sources tab on the top right.
6. Reload

> TIP Breakpoints can be added here

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
3. Select a phone and click the play/run icon
4. When the expo server is started press "A" to run in the emulated device

The developer menu can be brought up by pressing `CTRL + M`. However, this didn't work for me. You can use tools in the terminal by expo i.e. `M` will open developer tools. `J` will enable remote debugging and so on.

#### Phone Handset

You can either hit the URL in a web browser to get a browser version. Or use the Expo play store app.

#### via Browser

Just open a browser and hit the IP

#### via the App

1. Open the Expo App
2. Scan the QR code provided

## Package Scripts

There are various scripts within the `package.json` that can be ran such as a Type Script Compiler check. These can be run with a command like

`npm run <scriptname>`

Example `npm run ts:check`
