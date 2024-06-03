import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ZoneScoringType } from '../Enums/ZoneScoringType';
import { globalColours } from '../globalColours';
import { globalStyles } from '../globalStyles';

interface ScoreSelectorProps {
  scoringType: ZoneScoringType;
}

export default function ScoreSelector({ scoringType }: ScoreSelectorProps) {
  return scoringType === ZoneScoringType.TenPoint ? (
    <View style={styles.row}>
      <ScoreButton text="X" colour={globalColours.targetGold} />
      <ScoreButton text="9" colour={globalColours.targetGold} />
      <ScoreButton text="8" colour={globalColours.targetRed} />
      <ScoreButton text="7" colour={globalColours.targetRed} />
      <ScoreButton text="6" colour={globalColours.targetBlue} />
      <ScoreButton text="5" colour={globalColours.targetBlue} />
      <ScoreButton text="4" colour={globalColours.targetBlack} />
      <ScoreButton text="3" colour={globalColours.targetBlack} />
      <ScoreButton text="2" colour={globalColours.targetWhite} />
      <ScoreButton text="1" colour={globalColours.targetWhite} />
      <ScoreButton text="M" colour={globalColours.targetMiss} />
    </View>
  ) : (
    <View style={styles.row}>
      <ScoreButton text="9" colour={globalColours.targetGold} />
      <ScoreButton text="7" colour={globalColours.targetRed} />
      <ScoreButton text="5" colour={globalColours.targetBlue} />
      <ScoreButton text="3" colour={globalColours.targetBlack} />
      <ScoreButton text="1" colour={globalColours.targetWhite} />
      <ScoreButton text="M" colour={globalColours.targetMiss} />
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
      <Text>{text}</Text>
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
