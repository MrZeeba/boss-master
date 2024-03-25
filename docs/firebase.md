# Firebase

This is the background as a service (BAAS) used to provide authentication as well as the database functionality we require.

## Config

The configuration for Firebase can be found at `src/firebase/firebaseConfig.tsx`. This depends upon the existance of a keys.tsx file for local debugging. `App.tsx` must ensure that `firebaseConfig.tsx` is ran to register the Firebase services.

## API Keys

The api keys are stored within a local `keys.tsx` file currently which isn't checked into Git. They're also stored as environment variables for deployment.
