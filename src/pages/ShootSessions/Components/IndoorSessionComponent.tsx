import { View } from 'react-native';
import CustomPicker from '../../../Components/CustomPicker';
import * as RoundData from '../../../models/data/rounds.json';

export function IndoorSessionComponent({ control }) {
  const indoorData: ObjectWithDisplayName = RoundData.types.indoor
    .rounds as unknown as ObjectWithDisplayName;

  return (
    <View>
      <CustomPicker
        labelText="Round"
        name="roundPicker"
        control={control}
        data={indoorData}
        rules={{ required: 'A type of round is required' }}
      />
    </View>
  );
}
