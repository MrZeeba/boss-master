import { useState } from 'react';
import { View } from 'react-native';
import CustomPicker from '../../../components/CustomPicker';
import RoundInfoArea from '../../../components/RoundInfoArea';
import { IRound } from '../../../interfaces/RoundInterfaces';
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
      {round !== undefined && round.variations.length > 1 ? (
        <CustomPicker
          labelText="Variation"
          name="roundVariation"
          control={control}
          data={round.variations}
        />
      ) : null}
      {round !== undefined ? <RoundInfoArea round={round} /> : null}
    </View>
  );
}
