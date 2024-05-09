import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { globalStyles } from '../globalStyles';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  style?: (ViewStyle | null)[];
  icon?: React.ReactNode;
}

export default function CustomButton({
  onPress,
  title,
  style,
  icon,
}: CustomButtonProps) {
  return (
    <TouchableOpacity style={[globalStyles.button, style]} onPress={onPress}>
      {icon}
      <Text style={globalStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
