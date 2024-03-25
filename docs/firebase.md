# Firebase

This is the background as a service (BAAS) used to provide authentication as well as the database functionality we require.

## API Keys

The api keys are stored within a local `keys.tsx` file currently which isn't checked into Git. They're also stored as environment variables for deployment.

## Initialisation

Before any firebase functionality can take place, it's initialised within `./src/firebase/firebaseApp.tsx`. This happens every time we need to use a firebase service, at this time we export the various services we need from Firebase. Configuration for the service is passed in from an apiKeys file (which is not checked into git).

## Firebase Wrappers

Within the `./src/firebase` folder you'll find my own wrappers around the Firebase functionality I need and use.

- [Firestore Documentation](https://firebase.google.com/docs/firestore/quickstart#web-modular-api)
- [Auth Documentation](https://firebase.google.com/docs/auth/web/start#web-modular-api)
