import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { db } from '../firebase/firebaseApp';

export default function EditShootSession() {
  return (
    <View>
      <Text style={styles.baseText}>
        I am bold
        <Text style={styles.innerText}> and red</Text>
      </Text>
      <Button onPress={AddSession} title="Add temp session data" />
    </View>
  );
}

async function AddSession() {
  try {
    const date = new Date();
    const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    const docRef = await addDoc(collection(db, 'shooting_sessions'), {
      type: 'Practice',
      bow: 'Recurve',
      date: currentDate,
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold',
  },
  innerText: {
    color: 'red',
  },
});
