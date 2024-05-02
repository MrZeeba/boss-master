import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  icon?: React.ReactNode;
}

export default function CustomButton({
  onPress,
  title,
  icon,
}: CustomButtonProps) {
  return (
    <TouchableOpacity style={globalStyles.button} onPress={onPress}>
      {icon}
      <Text style={globalStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
