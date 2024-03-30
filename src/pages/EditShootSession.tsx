import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BowType } from '../Enums/BowType';
import { Bow } from '../models/Bow';
import { ShootSession } from '../models/ShootSession';
import { AddSession, DropTable } from '../sqlite/LocalDb';

export default function EditShootSession() {
  const [sqlResultText, setSQLResultText] = useState('...');

  return (
    <View>
      <Text style={styles.baseText}>
        I am bold
        <Text style={styles.innerText}> and red</Text>
      </Text>
      <Button onPress={NewSessionPressed} title="Add temp session data" />
      <Button onPress={ClearSessionsPressed} title="Delete ALL session data" />
      <Text>{sqlResultText}</Text>
    </View>
  );

  async function NewSessionPressed() {
    const session = new ShootSession();
    session.note = 'Hello! I am a note!';

    const bow = new Bow();
    bow.type = BowType.Recurve;

    session.bow = bow;

    AddSession(session, id => {
      const resultString = `Session was inserted with id: ${id}`;
      console.log(resultString);
      setSQLResultText(resultString);
    });
  }

  async function ClearSessionsPressed() {
    DropTable(`shootsessions`, result => setSQLResultText(result.toString()));
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
