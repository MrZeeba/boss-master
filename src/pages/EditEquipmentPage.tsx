import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Button, Text, View } from 'react-native';

export function EditEquipmentPage({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      console.log('User has focused modal');
    }, []),
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss Yawl" />
    </View>
  );
}
