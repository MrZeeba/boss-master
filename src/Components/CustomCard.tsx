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
    <View style={[styles.cardFlex, styles.cardContainer]}>
      <Image
        id="image-thumbnail"
        style={styles.thumbnail}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Patrick_Stewart_by_Gage_Skidmore_2.jpg',
        }}
      />
      <View id="middle-content" style={globalStyles.pageContainer}>
        <Text style={styles.cardHeading}>{heading}</Text>
        <Text>{fieldOne}</Text>
        <Text>{fieldTwo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardHeading: {
    fontWeight: 'bold',
  },

  cardContainer: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
  },

  cardFlex: {
    flexDirection: 'row',
  },

  thumbnail: {
    width: 100,
  },
});
