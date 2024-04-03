import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import { Validate as ValidateEquipment } from './src/sqlite/EquipmentDb';
import { Validate as ValidateShootSessions } from './src/sqlite/ShootSessionsDb';

export default function App() {
  ValidateEquipment();
  ValidateShootSessions();

  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
