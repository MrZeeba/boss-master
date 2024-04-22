import { useState } from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../Components/CustomButton';
import { EquipmentDb } from '../sqlite/EquipmentDb';
import { DropTable, TruncateTable } from '../sqlite/LocalDb';
import { ShootSessionsDb } from '../sqlite/ShootSessionsDb';

export default function SettingsPage() {
  const [sqlResultText, setSQLResultText] = useState('...');

  function RestructurePressed() {}

  return (
    <View>
      <Text>{sqlResultText}</Text>

      <Text style={{ fontWeight: 'bold' }}>General</Text>
      <CustomButton
        title="Restructure DB"
        onPress={() => RestructurePressed()}
      />

      <Text style={{ fontWeight: 'bold' }}>Shoot Sessions</Text>
      <CustomButton
        title="Truncate Shoot Sessions"
        onPress={() => TruncateTablePressed(ShootSessionsDb)}
      />
      <CustomButton
        title="Recreate Shoot Sessions (Deletes Data)"
        onPress={() => RecreateTablePressed(ShootSessionsDb)}
      />

      <Text style={{ fontWeight: 'bold' }}>Equipment</Text>
      <CustomButton
        onPress={() => TruncateTablePressed(EquipmentDb)}
        title="Truncate ALL data"
      />
      <CustomButton
        onPress={() => RecreateTablePressed(EquipmentDb)}
        title="Recreate Table (Drops Data)"
      />
      <CustomButton onPress={InsertTestData} title="Insert test data" />
    </View>
  );

  async function TruncateTablePressed<T extends DbTable<any>>(table: T) {
    TruncateTable(table.tableName, sqlResults => {
      setSQLResultText(`${sqlResults} rows deleted`);
    });
  }

  async function RecreateTablePressed<T extends DbTable<any>>(table: T) {
    DropTable(table.tableName, true, table.Validate, sqlResults => {
      setSQLResultText(`${sqlResults} rows deleted`);
    });
  }

  async function InsertTestData() {
    console.log('throw currently broken!');

    const testBowData = [];
    testBowData.forEach(value => {
      const equipment = new Equipment();
      equipment.name = value.name;
      EquipmentDb.Create(equipment, id => {
        console.log('Created new equipment with id', id);
      });
    });
  }
}
