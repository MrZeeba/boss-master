// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCpblAElgtbHqIQ5kV5lNMbk59VUs3iBYw',
  authDomain: 'boss-master-29343.firebaseapp.com',
  projectId: 'boss-master-29343',
  storageBucket: 'boss-master-29343.appspot.com',
  messagingSenderId: '712443726643',
  appId: '1:712443726643:web:36b88c112059b35d104c46',
  measurementId: 'G-2P2N66ZRZ8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
