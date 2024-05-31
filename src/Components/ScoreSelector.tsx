import { View } from 'react-native';
import { ScoringType } from '../Enums/ScoringType';
import CustomButton from './CustomButton';

interface ScoreSelectorProps {
  mode: ScoringType;
}

export default function ScoreSelector({ mode }: ScoreSelectorProps) {
  return (
    <View>
      <CustomButton title="X" onPress={() => console.log('x was pressed')} />
      <CustomButton title="9" onPress={() => console.log('9 was pressed')} />
      <CustomButton title="8" onPress={() => console.log('8 was pressed')} />
    </View>
  );
}
