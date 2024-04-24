import { Text, View } from 'react-native';
import { ShootSessionData } from '../../models/ShootSessionData';

/*
An active scoring session. This is someone in the middle of shooting a round
*/
export default function EditScorecardPage({
  navigation,
  sessionData,
}: {
  navigation: any;
  sessionData: ShootSessionData;
}) {
  return (
    <View>
      <Text>{sessionData.dateShot}</Text>
    </View>
  );
}
