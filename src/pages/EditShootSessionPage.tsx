import React from 'react';
import { Text, View } from 'react-native';
import Button from '../Components/CustomButton';
import { BOWTYPE } from '../Enums/BowType';
import { Bow } from '../models/Bow';
import { ShootSession } from '../models/ShootSession';
import RoundData from '../models/data/rounds.json';
import { ShootSessionsDb } from '../sqlite/ShootSessionsDb';

export default function EditShootSessionPage() {
  return (
    <View>
      <Text>{RoundData.rounds.indoor.portsmouth.displayName}</Text>
      <Button title="Add temp session data" onPress={NewItemPressed} />
    </View>
  );

  async function NewItemPressed() {
    const session = new ShootSession();
    session.note = 'Hello! I am a note!';

    const bow = new Bow();
    bow.classification = BOWTYPE.Recurve;
    session.bow = bow;

    const date = new Date().toISOString();
    session.dateShot = date;

    ShootSessionsDb.Create(session, id => {
      const resultString = `Session was inserted with id: ${id}`;
      console.log(resultString);
    });
  }
}
