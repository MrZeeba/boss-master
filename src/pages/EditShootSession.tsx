import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BowType } from '../enums/BowType';
import { Bow } from '../models/Bow';
import { ShootSession } from '../models/ShootSession';
import { DropTable } from '../sqlite/LocalDb';
import { Create } from '../sqlite/ShootSessionsDb';

export default function EditShootSession() {
  const [sqlResultText, setSQLResultText] = useState('...');

  return (
    <View>
      <Text style={styles.baseText}>
        I am bold
        <Text style={styles.innerText}> and red</Text>
      </Text>
      <Button onPress={NewItemPressed} title="Add temp session data" />
      <Button
        onPress={DeleteTablePressed}
        title="Delete ALL session data & schema"
      />
      <Text>{sqlResultText}</Text>
    </View>
  );

  async function NewItemPressed() {
    const session = new ShootSession();
    session.note = 'Hello! I am a note!';

    const bow = new Bow();
    bow.type = BowType.Recurve;
    session.bow = bow;

    const date = new Date().toISOString();
    session.dateShot = date;

    Create(session, id => {
      const resultString = `Session was inserted with id: ${id}`;
      console.log(resultString);
      setSQLResultText(resultString);
    });
  }

  async function DeleteTablePressed() {
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
