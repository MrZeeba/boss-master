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
      <View style={globalStyles.container}>
        <Image
          id="image-thumbnail"
          style={styles.thumbnail}
          source={{
            uri: 'https://en.wikipedia.org/wiki/Patrick_Stewart#/media/File:Patrick_Stewart_by_Gage_Skidmore_2.jpg',
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
  },

  thumbnail: {
    flex: 0.3,
    width: 100,
    height: 100,
  },
});
