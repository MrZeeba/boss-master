import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScoringType } from '../Enums/ScoringType';
import { globalStyles } from '../globalStyles';

interface ScoreSelectorProps {
  mode: ScoringType;
}

export default function ScoreSelector({ mode }: ScoreSelectorProps) {
  return (
    <View style={styles.row}>
      <ScoreButton text="X" colour="yellow" />
      <ScoreButton text="9" colour="yellow" />
      <ScoreButton text="8" colour="red" />
      <ScoreButton text="7" colour="red" />
      <ScoreButton text="6" colour="lightblue" />
      <ScoreButton text="5" colour="lightblue" />
      <ScoreButton text="4" colour="black" />
      <ScoreButton text="3" colour="black" />
      <ScoreButton text="2" colour="white" />
      <ScoreButton text="1" colour="white" />
      <ScoreButton text="M" colour="orange" />
    </View>
  );
}

function ScoreButton({ text, colour }) {
  return (
    <TouchableOpacity
      style={[
        globalStyles.button,
        styles.scoreButton,
        { backgroundColor: colour },
      ]}
      onPressOut={() => console.log(`${text} was pressed`)}>
      <Text>X</Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  scoreButton: {
    margin: 2,
  },
});
