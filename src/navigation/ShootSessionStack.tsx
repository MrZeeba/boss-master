/*
The root stack for the shooting sessions
*/
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useCallback, useState } from 'react';
import { globalConstants } from '../globalConstants';
import { ShootSession } from '../models/ShootSession';
import EquipmentPage from '../pages/Equipment/EquipmentPage';
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

      if (draft) navigation.navigate(globalConstants.routes.scoreCardPage);
    }, []),
  );

  return (
    <ShootSessionStack.Navigator
      initialRouteName={globalConstants.routes.newShootSessionPage}>
      <ShootSessionStack.Screen
        name={globalConstants.routes.newShootSessionPage}
        component={NewShootSessionPage}
        initialParams={{ bow: undefined }}
        options={{ title: 'New session' }}
      />
      <ShootSessionStack.Screen
        name={globalConstants.routes.scoreCardPage}
        component={EditScorecardPage}
        options={{ title: 'Scorecard', headerLeft: () => null }}
      />
      <ShootSessionStack.Screen
        name={globalConstants.routes.equipmentPage}
        component={EquipmentPage}
        options={{ title: 'Select a Bow' }}
      />
    </ShootSessionStack.Navigator>
  );
}
