import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import LocalDB from './src/sqlite/LocalDb';

export default function App() {
  LocalDB.ValidateDB();

  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
