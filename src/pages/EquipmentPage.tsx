/*
The root stack for the equipment page
*/
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Equipment } from '../models/Equipment';
import { Create, tableName as equipmentTableName } from '../sqlite/EquipmentDb';
import { GetAll, TruncateTable } from '../sqlite/LocalDb';

/*
Equipment is currently just a bow but may be expanded in the future
*/
export default function EquipmentPage({ navigation }) {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);

  useFocusEffect(
    useCallback(() => {
      GetAll<Equipment>('equipment', results => setEquipmentList(results));
    }, []),
  );

  //Hook into the header add item icon
  useEffect(() => {
    // Use `setOptions` to setup the button
    navigation.setOptions({
      headerRight: () => (
        <Feather
          name="plus"
          size={32}
          color="black"
          onPress={() => navigation.navigate('EditEquipmentPage')}
        />
      ),
    });
  }, [navigation]);

  async function NewItemPressed() {
    const equipment = new Equipment();
    equipment.name = 'I am equipment!';

    Create(equipment, id => {
      console.log(`New equipment created with id ${id}`);
    });
  }

  async function TruncateTablePressed() {
    TruncateTable(equipmentTableName, sqlResults => {
      console.log(`${sqlResults} rows deleted`);
    });
  }

  return (
    <View>
      <Button onPress={TruncateTablePressed} title="Truncate ALL data" />
      {equipmentList.map(equipment => {
        return (
          <View key={equipment.id}>
            <Text>Hello!</Text>
            <Text>{equipment.name}</Text>
          </View>
        );
      })}
    </View>
  );
}
