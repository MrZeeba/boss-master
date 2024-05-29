import { Image, StyleSheet, Text, View } from 'react-native';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { globalStyles } from '../globalStyles';

interface CustomCardProps {
  heading: string;
  image?: string;
  placeholderImageUri?: string;
  fieldOne: string;
  fieldTwo: string;
  disableTap?: boolean;
  onPress?: () => void;
}

export default function CustomCard({
  heading,
  image,
  placeholderImageUri,
  fieldOne,
  fieldTwo,
  disableTap = false,
  onPress,
}: CustomCardProps) {
  const content = (
    <>
      {(image ?? placeholderImageUri) && (
        <Image
          id="image-thumbnail"
          style={styles.thumbnail}
          source={{
            uri: image ?? placeholderImageUri,
          }}
        />
      )}
      <View id="middle-content" style={globalStyles.pageContainer}>
        <Text style={styles.cardHeading}>{heading}</Text>
        <Text>{fieldOne}</Text>
        <Text>{fieldTwo}</Text>
      </View>
    </>
  );

  return disableTap ? (
    <View style={[styles.cardFlex, styles.cardContainer]}>{content}</View>
  ) : (
    <GestureHandlerRootView>
      <TouchableOpacity
        style={[styles.cardFlex, styles.cardContainer]}
        onPress={onPress}>
        {content}
      </TouchableOpacity>
    </GestureHandlerRootView>
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
