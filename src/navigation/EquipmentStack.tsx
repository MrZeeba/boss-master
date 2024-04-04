/*
The root stack for the equipment page
*/
import { createStackNavigator } from '@react-navigation/stack';
import { EditEquipmentPage } from '../pages/EditEquipmentPage';
import EquipmentPage from '../pages/EquipmentPage';

/*
Equipment is currently just a bow but may be expanded in the future
*/
export default function EquipmentStack() {
  const EquipmentStack = createStackNavigator();

  return (
    <EquipmentStack.Navigator>
      <EquipmentStack.Screen
        name="EquipmentPage"
        component={EquipmentPage}
        options={{ title: 'Equipment' }}
      />
      <EquipmentStack.Screen
        name="EditEquipmentPage"
        component={EditEquipmentPage}
        options={{ title: 'New Equipment' }}
      />
    </EquipmentStack.Navigator>
  );
}
