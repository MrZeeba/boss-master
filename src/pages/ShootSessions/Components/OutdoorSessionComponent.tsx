import { View } from 'react-native';
import CustomPicker from '../../../Components/CustomPicker';
import CustomInfoArea from '../../../Components/RoundInfoArea';
import * as RoundData from '../../../models/data/rounds.json';

export function OutdoorSessionComponent({ control }) {
  const outdoorData: ObjectWithDisplayName = RoundData.types.outdoor
    .rounds as unknown as ObjectWithDisplayName;

  return (
    <View>
      <CustomPicker
        labelText="Round"
        name="roundPicker"
        control={control}
        data={outdoorData}
        rules={{ required: 'A type of round is required' }}
      />
      <CustomInfoArea />
    </View>
  );
}
