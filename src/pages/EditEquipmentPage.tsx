import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import Button from '../Components/Button';

export function EditEquipmentPage({ route, navigation }) {
  const { id } = route.params;

  useFocusEffect(
    useCallback(() => {
      console.log('User has focused add equipment modal');
    }, []),
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This items id is {id}</Text>
      <Text>This is a modal!</Text>
      <Button title="Leave this place" onPress={navigation.}/>
    </View>
  );
}
