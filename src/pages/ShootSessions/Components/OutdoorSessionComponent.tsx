import { View } from 'react-native';
import CustomPicker from '../../../Components/CustomPicker';
import CustomInfoArea from '../../../Components/RoundInfoArea';
import { roundData } from '../../../models/data/rounds';

export function OutdoorSessionComponent({ control }) {
  return (
    <View>
      <CustomPicker
        labelText="Round"
        name="roundPicker"
        control={control}
        data={roundData.types.outdoor}
        rules={{ required: 'A type of round is required' }}
      />
      <CustomInfoArea />
    </View>
  );
}
