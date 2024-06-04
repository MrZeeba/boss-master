import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ZoneScoringType } from '../Enums/ZoneScoringType';
import { globalColours } from '../globalColours';
import { globalStyles } from '../globalStyles';

interface ScoreSelectorProps {
  scoringType: ZoneScoringType;
  addScore: (score: number) => void;
}

export default function ScoreSelector({
  scoringType,
  addScore,
}: ScoreSelectorProps) {
  return scoringType === ZoneScoringType.TenPoint ? (
    <View style={styles.row}>
      <ScoreButton
        text="X"
        value={10}
        colour={globalColours.targetGold}
        addScore={addScore}
      />
      <ScoreButton
        text="9"
        value={9}
        addScore={addScore}
        colour={globalColours.targetGold}
      />
      <ScoreButton
        text="8"
        value={8}
        addScore={addScore}
        colour={globalColours.targetRed}
      />
      <ScoreButton
        text="7"
        value={7}
        addScore={addScore}
        colour={globalColours.targetRed}
      />
      <ScoreButton
        text="6"
        value={6}
        addScore={addScore}
        colour={globalColours.targetBlue}
      />
      <ScoreButton
        text="5"
        value={5}
        addScore={addScore}
        colour={globalColours.targetBlue}
      />
      <ScoreButton
        text="4"
        value={4}
        addScore={addScore}
        colour={globalColours.targetBlack}
      />
      <ScoreButton
        text="3"
        value={3}
        addScore={addScore}
        colour={globalColours.targetBlack}
      />
      <ScoreButton
        text="2"
        value={2}
        addScore={addScore}
        colour={globalColours.targetWhite}
      />
      <ScoreButton
        text="1"
        value={1}
        addScore={addScore}
        colour={globalColours.targetWhite}
      />
      <ScoreButton
        text="M"
        value={0}
        addScore={addScore}
        colour={globalColours.targetMiss}
      />
    </View>
  ) : (
    <View style={styles.row}>
      <ScoreButton
        text="9"
        value={9}
        addScore={addScore}
        colour={globalColours.targetGold}
      />
      <ScoreButton
        text="7"
        value={7}
        addScore={addScore}
        colour={globalColours.targetRed}
      />
      <ScoreButton
        text="5"
        value={5}
        addScore={addScore}
        colour={globalColours.targetBlue}
      />
      <ScoreButton
        text="3"
        value={3}
        addScore={addScore}
        colour={globalColours.targetBlack}
      />
      <ScoreButton
        text="1"
        value={1}
        addScore={addScore}
        colour={globalColours.targetWhite}
      />
      <ScoreButton
        text="M"
        value={0}
        addScore={addScore}
        colour={globalColours.targetMiss}
      />
    </View>
  );
}

function ScoreButton({ text, value, colour, addScore }) {
  return (
    <TouchableOpacity
      style={[
        globalStyles.button,
        styles.scoreButton,
        { backgroundColor: colour },
      ]}
      onPressOut={() => addScore(value)}>
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
