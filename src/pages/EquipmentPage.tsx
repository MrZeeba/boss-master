import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useCallback, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Equipment } from '../models/Equipment';
import { Create, tableName as equipmentTableName } from '../sqlite/EquipmentDb';
import { GetAll, TruncateTable } from '../sqlite/LocalDb';
import { EditEquipmentModal } from './EditEquipmentModal';

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
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Feather
          name="plus"
          size={32}
          color="black"
          onPress={() => navigation.navigate('EditEquipmentModal')}
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

  const EquipmentStack = createStackNavigator();

  return (
    <EquipmentStack.Navigator>
      <EquipmentStack.Screen
        name="Equipment"
        component={EquipmentView}
        options={{ headerShown: false }}
      />
      <EquipmentStack.Group screenOptions={{ presentation: 'modal' }}>
        <EquipmentStack.Screen
          name="EditEquipmentModal"
          component={EditEquipmentModal}
        />
      </EquipmentStack.Group>
    </EquipmentStack.Navigator>
  );

  function EquipmentView() {
    return (
      <View>
        <Button onPress={TruncateTablePressed} title="Truncate ALL data" />
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
}
