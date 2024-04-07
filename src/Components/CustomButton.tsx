import React from 'react';
import { Pressable, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles';

export default function CustomButton(props) {
  const { onPress, title = 'Save' } = props;
  return (
    <TouchableOpacity style={globalStyles.button} onPress={onPress}>
      <Pressable>
        <Text style={globalStyles.text}>{title}</Text>
      </Pressable>
    </TouchableOpacity>
  );
}
