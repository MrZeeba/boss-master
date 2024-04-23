import { useState } from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../Components/CustomButton';
import { ExportDb } from '../debug/ExportDb';
import { BowDb } from '../sqlite/BowDb';
import { EquipmentDb } from '../sqlite/EquipmentDb';
import LocalDB, { DropTable, TruncateTable } from '../sqlite/LocalDb';
import { ShootSessionsDb } from '../sqlite/ShootSessionsDb';

export default function SettingsPage() {
  const [sqlResultText, setSQLResultText] = useState('...');

  function restructurePressed() {
    LocalDB.Restructure();
    EquipmentDb.GetInstance().Validate();
    BowDb.GetInstance().Validate();
    ShootSessionsDb.GetInstance().Validate();
  }

  return (
    <View>
      <Text>{sqlResultText}</Text>

      <Text style={{ fontWeight: 'bold' }}>General</Text>
      <CustomButton
        title="Restructure DB"
        onPress={() => restructurePressed()}
      />

      <CustomButton title="Export DB" onPress={() => ExportDb()} />

      <Text style={{ fontWeight: 'bold' }}>Shoot Sessions</Text>
      <CustomButton
        title="Truncate Shoot Sessions"
        onPress={() => truncateTablePressed(ShootSessionsDb)}
      />
      <CustomButton
        title="Recreate Shoot Sessions (Deletes Data)"
        onPress={() => recreateTablePressed(ShootSessionsDb)}
      />

      <Text style={{ fontWeight: 'bold' }}>Equipment</Text>
      <CustomButton
        onPress={() => truncateTablePressed(EquipmentDb)}
        title="Truncate ALL data"
      />
      <CustomButton
        onPress={() => recreateTablePressed(EquipmentDb)}
        title="Recreate Table (Drops Data)"
      />
      <CustomButton onPress={insertTestData} title="Insert test data" />
    </View>
  );

  async function truncateTablePressed<T extends DbTable<any>>(table: T) {
    TruncateTable(table.tableName, sqlResults => {
      setSQLResultText(`${sqlResults} rows deleted`);
    });
  }

  async function recreateTablePressed<T extends DbTable<any>>(table: T) {
    DropTable(table.tableName, true, table.Validate, sqlResults => {
      setSQLResultText(`${sqlResults} rows deleted`);
    });
  }

  async function insertTestData() {
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
