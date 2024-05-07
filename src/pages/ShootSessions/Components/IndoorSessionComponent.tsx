import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import CustomPicker from '../../../Components/CustomPicker';
import { ShootSession } from '../../../models/ShootSession';
import * as RoundData from '../../../models/data/rounds.json';

export function IndoorSessionComponent() {
  const indoorData: ObjectWithDisplayName = RoundData.types.indoor
    .rounds as unknown as ObjectWithDisplayName;

  const {
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm<ShootSession>();

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
