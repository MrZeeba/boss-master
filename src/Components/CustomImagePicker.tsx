import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, ImageStyle, StyleSheet, View } from 'react-native';
import { globalColours } from '../globalColours';

/* 
Wrap the component you want to be a picker in a CustomImagePicker
*/

export enum CustomImagePickerStyle {
  RoundedBottom,
  Squared,
}

interface CustomImagePickerProps {
  style?: ImageStyle;
  placeholderSrc?: number;
}

/*
A custom image picker
style - is a css style object
placeholderSrc - should be passed in via a 'require' statement
*/
export default function CustomImagePicker({
  style,
  placeholderSrc,
}: CustomImagePickerProps) {
  const [image, setImage] = useState<string>();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.imageContainer}>
      {image ? renderImage() : renderPlaceholder(placeholderSrc)}
    </View>
  );

  function renderPlaceholder(placeholderSrc: number | undefined) {
    return (
      <>
        <Image
          style={[styles.image, styles.placeholder]}
          source={placeholderSrc}
        />
        <Feather
          style={[styles.cameraIcon]}
          name="camera"
          size={150}
          color="darkgreen"
          onPress={pickImage}
        />
      </>
    );
  }

  function renderImage() {
    console.log(image);
    return <Image style={styles.image} source={{ uri: image }} />;
  }
}

const styles = StyleSheet.create({
  image: {
    //Undo scale from container to prevent image distortion
    transform: [{ scaleX: 0.5 }],
    alignSelf: 'center',
    flex: 1,
    width: '100%',
  },

  placeholder: {
    tintColor: globalColours.primary,
  },

  cameraIcon: {
    transform: [{ scaleX: 0.5 }],
    position: 'absolute',
    alignSelf: 'center',
  },

  imageContainer: {
    position: 'relative',
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
    overflow: 'hidden',
    height: 200,
    transform: [{ scaleX: 2 }], //Done to achieve a rounded bottom
    backgroundColor: globalColours.secondary,
  },
});
