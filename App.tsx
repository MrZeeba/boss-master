import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './src/navigation/NavigationBar';
import { ValidateDb } from './src/sqlite/ValidateDb';

export default function App() {
  ValidateDb();

  return (
    <NavigationContainer>
      <NavigationBar />
    </NavigationContainer>
  );
}
