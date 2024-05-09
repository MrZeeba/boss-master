import { Text, View } from 'react-native';
import { ShootSession } from '../../models/ShootSession';

/*
An active scoring session. This is someone in the middle of shooting a round
*/
export default function EditScorecardPage({
  navigation,
  sessionData,
}: {
  navigation: any;
  sessionData: ShootSession;
}) {
  return (
    <View>
      <Text>{sessionData.dateShot}</Text>
    </View>
  );
}
