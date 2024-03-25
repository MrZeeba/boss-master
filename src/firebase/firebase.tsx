import * as firebase from 'firebase/app';
import apiKeys from '../../apiKeys';

firebase.initializeApp(apiKeys.firebase);

export default firebase;
