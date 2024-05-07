import { StyleSheet, Text, View } from 'react-native';
import { globalColours } from '../globalColours';

export default function CustomInfoArea() {
  return (
    <View style={styles.container}>
      <Text>Herro!</Text>
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
