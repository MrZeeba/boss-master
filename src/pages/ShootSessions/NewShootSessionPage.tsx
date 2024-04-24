import { Text, View } from 'react-native';
import RoundData from '../../models/data/rounds.json';

/*
Metadata page for gathering information before a round can be shot such as the type
*/
export default function NewShootSessionPage({ navigation }) {
  return (
    <View>
      <Text>{RoundData.rounds.indoor.portsmouth.displayName}</Text>
    </View>
  );
}
