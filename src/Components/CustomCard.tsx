import { Image, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../globalStyles';

interface CustomCardProps {
  heading: string;
  fieldOne: string;
  fieldTwo: string;
}

export default function CustomCard({
  heading,
  fieldOne,
  fieldTwo,
}: CustomCardProps) {
  return (
    <View style={globalStyles.pageContainer}>
      <View
        style={[globalStyles.container, (style = { flexDirection: 'row' })]}>
        <Image
          id="image-thumbnail"
          style={styles.thumbnail}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Patrick_Stewart_by_Gage_Skidmore_2.jpg',
          }}
        />
        <View id="middle-content">
          <Text style={styles.cardHeading}>{heading}</Text>
          <Text>{fieldOne}</Text>
          <Text>{fieldTwo}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardHeading: {
    fontWeight: 'bold',
    flex: 0.5,
  },

  thumbnail: {
    flex: 0.3,
    width: 50,
    height: 50,
    borderRadius: 40,
  },
});
