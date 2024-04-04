import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

const ModalStack = createStackNavigator();

//Takes in props for which component to render
export default function ModalNavigation() {
  return (
    <ModalStack.Navigator screenOptions={{ presentation: 'modal' }}>
      <ModalStack.Screen
        name="temp"
        component={TempComponent}
        options={{
          title: 'Hello',
        }}
      />
    </ModalStack.Navigator>
  );
}

function TempComponent() {
  return (
    <View>
      <Text>Hello! I might be a modal!</Text>
    </View>
  );
}
