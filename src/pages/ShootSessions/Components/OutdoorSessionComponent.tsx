import { useState } from 'react';
import { View } from 'react-native';
import CustomPicker from '../../../Components/CustomPicker';
import RoundInfoArea from '../../../Components/RoundInfoArea';
import { IRound } from '../../../Interfaces/RoundInterfaces';
import { outdoorRounds } from '../../../models/data/outdoorRounds';

export function OutdoorSessionComponent({ control }) {
  const [round, setRound] = useState<IRound | undefined>(undefined);

  return (
    <View>
      <CustomPicker
        labelText="Round"
        name="roundPicker"
        control={control}
        data={outdoorRounds}
        onSelect={(selected: IRound) => setRound(selected)}
        rules={{ required: 'A type of round is required' }}
      />
      {round !== undefined ? <RoundInfoArea round={round} /> : null}
    </View>
  );
}
