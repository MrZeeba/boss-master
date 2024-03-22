import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditShootSession from '../pages/EditShootSession';
import History from '../pages/History';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import { styles } from '../styles';

const Tab = createBottomTabNavigator();
const iconSize: number = 32;

export default function NavigationBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: styles.primaryColour.backgroundColor,
        tabBarLabelStyle: {
          fontSize: 16,
        },
      }}>
      <Tab.Screen
        name="Shoot"
        component={EditShootSession}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="target" size={iconSize} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="notebook-outline"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={iconSize} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
