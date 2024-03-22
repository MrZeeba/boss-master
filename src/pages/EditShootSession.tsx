import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function EditShootSession() {
  return (
    <Text style={styles.baseText}>
      I am bold
      <Text style={styles.innerText}> and red</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold',
  },
  innerText: {
    color: 'red',
  },
});
