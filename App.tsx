import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import { BowDb } from './src/sqlite/BowDb';
import { EndDb } from './src/sqlite/EndDb';
import { EquipmentDb } from './src/sqlite/EquipmentDb';
import { ShootSessionDb } from './src/sqlite/ShootSessionDb';

export default function App() {
  EquipmentDb.GetInstance().Validate();
  BowDb.GetInstance().Validate();
  ShootSessionDb.GetInstance().Validate();
  EndDb.GetInstance().Validate();

  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
