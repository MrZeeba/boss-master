import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import apiKeys from '../../apiKeys';

//Initialise firebase
export const app = firebase.initializeApp(apiKeys.firebase);

//Set firestore global settings
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});

//Instantiate various firebase services for use elsewhere constructed using the app
export const auth = getAuth(app);
export const db = getFirestore(app);
