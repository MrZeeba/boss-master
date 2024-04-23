import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import { EquipmentDb } from './src/sqlite/EquipmentDb';

export default function App() {
  EquipmentDb.GetInstance().Validate();
  //BowDb.GetInstance().Validate();
  //ShootSessionsDb.GetInstance().Validate();

  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
