import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function CustomBackButton({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <AntDesign name="back" size={24} color="black" />
    </TouchableOpacity>
  );
}
