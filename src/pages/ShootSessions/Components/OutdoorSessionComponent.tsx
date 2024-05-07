import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import CustomInfoArea from '../../../Components/CustomInfoArea';
import CustomPicker from '../../../Components/CustomPicker';
import { ShootSession } from '../../../models/ShootSession';
import * as RoundData from '../../../models/data/rounds.json';

export function OutdoorSessionComponent() {
  const outdoorData: ObjectWithDisplayName = RoundData.types.outdoor
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
        data={outdoorData}
        rules={{ required: 'A type of round is required' }}
      />
      <CustomInfoArea />
    </View>
  );
}
