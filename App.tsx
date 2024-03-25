import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './src/pages/SignUp';

export default function App() {
  console.log('I am a line of logging!!');

  return (
    <View style={styles.container}>
      <SignUp />
      <Text>This text has been updated! Or has it?</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
