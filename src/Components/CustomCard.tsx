import { Image, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../globalStyles';

interface CustomCardProps {
  heading: string;
  image: string;
  placeholderImageUri?: string;
  fieldOne: string;
  fieldTwo: string;
}

export default function CustomCard({
  heading,
  image,
  placeholderImageUri,
  fieldOne,
  fieldTwo,
}: CustomCardProps) {
  console.log(image, placeholderImageUri);
  return (
    <View style={[styles.cardFlex, styles.cardContainer]}>
      <Image
        id="image-thumbnail"
        style={styles.thumbnail}
        source={{
          uri: image ? image : placeholderImageUri,
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
