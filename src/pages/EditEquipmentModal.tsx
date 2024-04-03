import { Button, Text, View } from 'react-native';

export function EditEquipmentModal({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}
