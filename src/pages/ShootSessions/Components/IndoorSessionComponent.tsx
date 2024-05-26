import { useState } from 'react';
import { View } from 'react-native';
import CustomPicker from '../../../Components/CustomPicker';
import RoundInfoArea from '../../../Components/RoundInfoArea';
import { IRound } from '../../../Interfaces/RoundInterfaces';
import { roundData } from '../../../models/data/rounds';

export function IndoorSessionComponent({ control }) {
  const [round, setRound] = useState<IRound | undefined>(undefined);

  return (
    <View>
      <CustomPicker
        labelText="Round"
        name="roundPicker"
        control={control}
        data={roundData.indoor.rounds}
        onSelect={(selected: IRound) => setRound(selected)}
        rules={{ required: 'A type of round is required' }}
      />
      {round !== undefined ? <RoundInfoArea round={round} /> : null}
    </View>
  );
}
