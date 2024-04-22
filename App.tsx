import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';

export default function App() {
  //EquipmentDb.Validate();
  //ShootSessionsDb.Validate();

  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
