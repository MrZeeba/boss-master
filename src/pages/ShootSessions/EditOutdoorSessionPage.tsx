import { Text, View } from 'react-native';
import CustomPicker from '../../Components/CustomPicker';
import * as RoundData from '../../models/data/rounds.json';

export default function EditOutdoorSessionPage() {
  const data = RoundData.types.outdoor;
  return (
    <View>
      <CustomPicker data={Object.values(data.rounds)} />
      {Object.values(data.rounds).map(round => (
        <Text key={round.displayName}>{round.displayName}</Text>
      ))}
    </View>
  );
}
