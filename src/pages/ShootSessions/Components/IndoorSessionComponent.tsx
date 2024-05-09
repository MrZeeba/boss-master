import { View } from 'react-native';
import CustomPicker from '../../../Components/CustomPicker';
import { roundData } from '../../../models/data/rounds';

export function IndoorSessionComponent({ control }) {
  return (
    <View>
      <CustomPicker
        labelText="Round"
        name="roundPicker"
        control={control}
        data={roundData.types.indoor}
        rules={{ required: 'A type of round is required' }}
      />
    </View>
  );
}
