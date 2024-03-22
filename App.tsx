import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './src/navigation/NavigationBar';

export default function App() {
  console.log('I am a line of logging!!');

  return (
    <NavigationContainer>
      <NavigationBar />
    </NavigationContainer>
  );
}
