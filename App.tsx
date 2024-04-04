import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import { EquipmentDb } from './src/sqlite/EquipmentDb';
import { Validate as ValidateShootSessions } from './src/sqlite/ShootSessionsDb';

export default function App() {
  EquipmentDb.Validate();
  ValidateShootSessions();

  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
