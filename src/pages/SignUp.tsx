import { Button } from 'react-native';
import { register } from '../firebase/auth';

export default function SignUp() {
  return (
    <Button
      onPress={register('foo@gmail.com', 'testpassword123')}
      title="Submit Details"
    />
  );
}
