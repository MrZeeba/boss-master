import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseApp';
import { ShootSessionData } from '../models/ShootSession';

export async function AddSession(sessionData: ShootSessionData) {
  try {
    const docRef = await addDoc(collection(db, 'shooting_sessions'), {
      type: sessionData.type,
      bow: sessionData.bow,
      date: sessionData.date,
      note: sessionData.note,
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
