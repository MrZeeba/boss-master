/*
The root stack for the shooting sessions
*/
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useCallback, useState } from 'react';
import { ShootSession } from '../models/ShootSession';
import EditScorecardPage from '../pages/ShootSessions/EditScorecardPage';
import NewShootSessionPage from '../pages/ShootSessions/NewShootSessionPage';
import { ShootSessionDb } from '../sqlite/ShootSessionDb';

/*
Equipment is currently just a bow but may be expanded in the future
*/
export default function ShootSessionStack({ navigation }) {
  const ShootSessionStack = createStackNavigator();

  const [draft, setDraft] = useState<ShootSession>();

  const shootSessionDb = ShootSessionDb.GetInstance();

  useFocusEffect(
    useCallback(() => {
      shootSessionDb.GetDraft().then(draft => setDraft(draft));

      if (draft) navigation.navigate('EditScorecardPage');
    }, []),
  );

  return (
    <ShootSessionStack.Navigator initialRouteName="NewShootSessionPage">
      <ShootSessionStack.Screen
        name="NewShootSessionPage"
        component={NewShootSessionPage}
        options={{ title: 'New session' }}
      />
      <ShootSessionStack.Screen
        name="EditScorecardPage"
        component={EditScorecardPage}
        options={{ title: 'Scorecard', headerLeft: () => null }}
      />
    </ShootSessionStack.Navigator>
  );
}
