import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditShootSession from '../pages/EditShootSessionPage';
import HistoryPage from '../pages/HistoryPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import { styles } from '../styles';
import EquipmentStack from './EquipmentStack';

const Tab = createBottomTabNavigator();
const iconSize: number = 32;

export default function TabNavigation() {
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