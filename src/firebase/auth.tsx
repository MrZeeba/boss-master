import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Alert } from 'react-native';

export async function register(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed up
      const user = userCredential.user;
      Alert.alert(
        `Successfully signed user up with display name: ${user.displayName}`,
      );
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert('Failed to sign up user', errorMessage);
    });
}
