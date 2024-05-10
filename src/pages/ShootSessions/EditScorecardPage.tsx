import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ShootSession } from '../../models/ShootSession';

/*
An active scoring session. This is someone in the middle of shooting a round
*/
export default function EditScorecardPage({ navigation, route }) {
  const { session }: { session: ShootSession } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: session.round.displayName });
  }, [navigation]);

  //Where should the buttons be for discarding/saving? they shouldn't be easily pressed
  //We should auto-save every end

  return (
    <View>
      <Text>{session.dateShot}</Text>
      <Text>{session.round.displayName}</Text>
      <Text>End 1 of 4</Text>
      <Text>Arrow 1 of 6</Text>
    </View>
  );
}
