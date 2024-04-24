import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import { BowDb } from './src/sqlite/BowDb';
import { EquipmentDb } from './src/sqlite/EquipmentDb';
import { ShootSessionsDb } from './src/sqlite/ShootSessionsDb';

export default function App() {
  EquipmentDb.GetInstance().Validate();
  BowDb.GetInstance().Validate();
  ShootSessionsDb.GetInstance().Validate();

  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
