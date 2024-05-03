import { Text, View } from 'react-native';
import * as RoundData from '../../models/data/rounds.json';

export default function EditPracticeSessionPage() {
  const data = RoundData.types.practice;
  return (
    <View>
      <Text>{data.displayName}</Text>
    </View>
  );
}
