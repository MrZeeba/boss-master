import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { BowType } from '../enums/BowType';
import { Bow } from '../models/Bow';
import { ShootSession } from '../models/ShootSession';
import { DropTable, TruncateTable } from '../sqlite/LocalDb';
import {
  Create,
  tableName as shootSessionsTableName,
} from '../sqlite/ShootSessionsDb';

export default function EditShootSession() {
  const [sqlResultText, setSQLResultText] = useState('...');

  return (
    <View>
      <Button onPress={NewItemPressed} title="Add temp session data" />
      <Button onPress={DeleteTablePressed} title="Delete ALL data & schema" />
      <Button onPress={TruncateTablePressed} title="Truncate ALL data" />
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
    DropTable(shootSessionsTableName, result =>
      setSQLResultText(result.toString()),
    );
  }

  async function TruncateTablePressed() {
    TruncateTable(shootSessionsTableName, sqlResults => {
      setSQLResultText(`${sqlResults} rows deleted`);
    });
  }
}
