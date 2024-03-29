import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ShootSession } from '../models/ShootSession';
import { AddSession } from '../sqlite/LocalDb';

export default function EditShootSession() {
  return (
    <View>
      <Text style={styles.baseText}>
        I am bold
        <Text style={styles.innerText}> and red</Text>
      </Text>
      <Button onPress={NewSessionPressed} title="Add temp session data" />
    </View>
  );
}

async function NewSessionPressed() {
  const session = new ShootSession();
  session.note = 'Hello! I am a note!';
  AddSession(session);
}

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold',
  },
  innerText: {
    color: 'red',
  },
});
