import React from 'react';
import { View } from 'react-native';
import Button from '../Components/CustomButton';
import { BOWTYPE } from '../Enums/BowType';
import { Bow } from '../models/Bow';
import { ShootSession } from '../models/ShootSession';
import { ShootSessionsDb } from '../sqlite/ShootSessionsDb';

export default function EditShootSessionPage() {
  return (
    <View>
      <Button title="Add temp session data" onPress={NewItemPressed} />
    </View>
  );

  async function NewItemPressed() {
    const session = new ShootSession();
    session.note = 'Hello! I am a note!';

    const bow = new Bow();
    bow.type = BOWTYPE.Recurve;
    session.bow = bow;

    const date = new Date().toISOString();
    session.dateShot = date;

    ShootSessionsDb.Create(session, id => {
      const resultString = `Session was inserted with id: ${id}`;
      console.log(resultString);
    });
  }
}
