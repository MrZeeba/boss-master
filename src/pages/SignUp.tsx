import React from 'react';
import { Button } from 'react-native';

export default function SignUp() {
  return (
    <Button
      onPress={() => console.log('I was pressed')}
      title="Submit Details"
    />
  );
}
