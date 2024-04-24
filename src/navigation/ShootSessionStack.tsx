/*
The root stack for the shooting sessions
*/
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useCallback } from 'react';
import EditScorecardPage from '../pages/ShootSessions/EditScorecardPage';
import NewShootSessionPage from '../pages/ShootSessions/NewShootSessionPage';

/*
Equipment is currently just a bow but may be expanded in the future
*/
export default function ShootSessionStack({ navigation }) {
  const ShootSessionStack = createStackNavigator();

  const eggs = false;

  useFocusEffect(
    useCallback(() => {
      console.log('User has focused modal');

      eggs
        ? navigation.navigate('EditScorecardPage')
        : navigation.navigate('NewShootSessionPage');
    }, []),
  );

  return (
    <ShootSessionStack.Navigator>
      <ShootSessionStack.Screen
        name="EditScorecardPage"
        component={EditScorecardPage}
        options={{ title: 'Scorecard' }}
      />
      <ShootSessionStack.Screen
        name="NewShootSessionPage"
        component={NewShootSessionPage}
        options={{ title: 'New session' }}
      />
    </ShootSessionStack.Navigator>
  );
}
