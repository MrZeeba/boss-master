import { StyleSheet, Text, View } from 'react-native';
import { IRound } from '../Interfaces/RoundInterfaces';
import { globalColours } from '../globalColours';

interface RoundAreaInfoProps {
  round: IRound;
}

export default function RoundInfoArea({ round }: RoundAreaInfoProps) {
  return (
    <View style={styles.container}>
      <Text>Distance Type: {round.distanceType}</Text>
      <Text>Arrows per end: {round.arrowsPerEnd}</Text>
      <Text>Face size: {round.faceSize}cm</Text>
      <Text>Zone Scoring: {round.zoneScoring}</Text>
      <Text>Arrows at each distance: {round.arrowsAtEachDistance}</Text>
      {round.distances?.map(item => (
        <Text key={item.distance}>
          Distance: {item.distance} Arrows: {item.arrows}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: globalColours.border,
  },
});
