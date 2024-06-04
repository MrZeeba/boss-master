import { useState } from 'react';
import { View } from 'react-native';
import CustomPicker from '../../../Components/CustomPicker';
import RoundInfoArea from '../../../Components/RoundInfoArea';
import { IRound } from '../../../Interfaces/RoundInterfaces';
import { indoorRounds } from '../../../models/data/indoorRounds';

export function IndoorSessionComponent({ control }) {
  const [round, setRound] = useState<IRound | undefined>(undefined);

  return (
    <View>
      <CustomPicker
        labelText="Round"
        name="roundPicker"
        control={control}
        data={indoorRounds}
        onSelect={(selected: IRound) => setRound(selected)}
        rules={{ required: 'A type of round is required' }}
      />
      {round !== undefined ? <RoundInfoArea round={round} /> : null}
    </View>
  );
}
