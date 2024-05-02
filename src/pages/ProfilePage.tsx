import React from 'react';
import { Text, View } from 'react-native';
import { globalColours } from '../globalColours';

export default function ProfilePage() {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 400,
        padding: 20,
      }}>
      <View style={{ backgroundColor: globalColours.primary, flex: 0.3 }}>
        <Text>#72705B</Text>
      </View>
      <View style={{ backgroundColor: globalColours.highlight, flex: 0.3 }}>
        <Text>#E8C547</Text>
      </View>
      <View style={{ backgroundColor: globalColours.secondary, flex: 0.3 }}>
        <Text>#50C878</Text>
      </View>
    </View>
  );
}
