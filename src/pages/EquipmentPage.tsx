import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Equipment } from '../models/Equipment';
import { Create } from '../sqlite/EquipmentDB';
import { GetAll } from '../sqlite/LocalDb';

export default function EquipmentPage() {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);

  useEffect(() => {
    GetAll<Equipment>('equipment', results => setEquipmentList(results));
  }, []); //DOES NOT REFRESH

  async function NewItem() {
    const equipment = new Equipment();
    equipment.name = 'I am equipment!';

    Create(equipment, id => {
      console.log(`New equipment created with id ${id}`);
    });
  }

  return (
    <View>
      <Text>equipment!</Text>
      <Button onPress={NewItem} title="Add temp equipment data" />
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
