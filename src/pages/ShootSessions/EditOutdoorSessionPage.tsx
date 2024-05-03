import { Text, View } from 'react-native';
import * as RoundData from '../../models/data/rounds.json';

export default function EditOutdoorSessionPage() {
  const data = RoundData.types.outdoor;
  return (
    <View>
      {Object.values(data.rounds).map(round => (
        <Text key={round.displayName}>{round.displayName}</Text>
      ))}
    </View>
  );
}
