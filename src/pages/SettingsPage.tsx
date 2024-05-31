import { useState } from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../Components/CustomButton';
import { ExportDb } from '../debug/ExportDb';
import { BowDb } from '../sqlite/BowDb';
import { EquipmentDb } from '../sqlite/EquipmentDb';
import LocalDB, { TruncateTable } from '../sqlite/LocalDb';
import { ShootSessionDb } from '../sqlite/ShootSessionDb';

export default function SettingsPage() {
  const [sqlResultText, setSQLResultText] = useState('...');

  function restructurePressed() {
    LocalDB.Restructure();
    EquipmentDb.GetInstance().Validate();
    BowDb.GetInstance().Validate();
    ShootSessionDb.GetInstance().Validate();
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
        onPress={() => truncateTablePressed(LocalDB.SHOOTSESSION_TABLE_NAME)}
      />
      <CustomButton
        title="Recreate Shoot Sessions (Deletes Data)"
        onPress={() => {
          ShootSessionDb.GetInstance().Restructure();
        }}
      />

      <Text style={{ fontWeight: 'bold' }}>Equipment</Text>
      <CustomButton
        onPress={() => truncateTablePressed(LocalDB.EQUIPMENT_TABLE_NAME)}
        title="Truncate ALL data"
      />
      <CustomButton
        onPress={() =>
          recreateTablePressed(LocalDB.EQUIPMENT_TABLE_NAME, EquipmentDb)
        }
        title="Recreate Table (Drops Data)"
      />
      <CustomButton onPress={insertTestData} title="Insert test data" />
    </View>
  );

  async function truncateTablePressed(tableName: string) {
    TruncateTable(tableName, sqlResults => {
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
