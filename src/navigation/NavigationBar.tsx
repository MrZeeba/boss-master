import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditShootSession from '../pages/EditShootSession';
import History from '../pages/History';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Shoot" component={EditShootSession} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
