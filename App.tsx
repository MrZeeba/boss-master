import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import { EquipmentDb } from './src/sqlite/EquipmentDb';
import { ShootSessionsDb } from './src/sqlite/ShootSessionsDb';

export default function App() {
  EquipmentDb.Validate();
  ShootSessionsDb.Validate();

  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
