import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Equipment } from '../models/Equipment';
import { Create } from '../sqlite/EquipmentDb';
import { DropTable, GetAll } from '../sqlite/LocalDb';

export default function EquipmentPage() {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);

  useFocusEffect(
    useCallback(() => {
      GetAll<Equipment>('equipment', results => setEquipmentList(results));
    }, []),
  );

  async function NewItemPressed() {
    const equipment = new Equipment();
    equipment.name = 'I am equipment!';

    Create(equipment, id => {
      console.log(`New equipment created with id ${id}`);
    });
  }

  async function DeleteTablePressed() {
    DropTable(`equipment`, sqlResults => {
      console.log(sqlResults);
    });
  }

  return (
    <View>
      <Text>equipment!</Text>
      <Button onPress={NewItemPressed} title="Add temp equipment data" />
      <Button
        onPress={DeleteTablePressed}
        title="Delete ALL session data & schema"
      />
      {equipmentList.map(equipment => {
        return (
          <View key={equipment.id}>
            <Text>{equipment.name}</Text>
          </View>
        );
      })}
    </View>
  );
}
