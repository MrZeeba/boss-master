import React from 'react';
import { Pressable, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../styles';

export default function Button(props) {
  const { onPress, title = 'Save' } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Pressable>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </TouchableOpacity>
  );
}
