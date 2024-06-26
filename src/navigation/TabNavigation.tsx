import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { globalStyles } from '../globalStyles';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import HistoryPage from '../pages/ShootSessions/HistoryPage';
import EquipmentStack from './EquipmentStack';
import ShootSessionStack from './ShootSessionStack';

const Tab = createBottomTabNavigator();
const iconSize: number = 32;
const largeIconSize: number = 46;

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: globalStyles.primaryColour.backgroundColor,
        tabBarLabelStyle: {
          fontSize: 16,
        },
      }}>
      <Tab.Screen
        name="History"
        component={HistoryPage}
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
        name="Equipment"
        component={EquipmentStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bow-arrow"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Shoot"
        component={ShootSessionStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="target" size={largeIconSize} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
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
        component={SettingsPage}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={iconSize} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
