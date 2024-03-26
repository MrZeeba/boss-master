import { addDoc, collection } from 'firebase/firestore';
import { Controller, useForm } from 'react-hook-form';
import { Button, Text, TextInput, View } from 'react-native';
import { db } from '../firebase/firebaseApp';

type ShootSessionData = {
  type: string;
  note: string;
  bow: string;
  date: string;
};

export default function EditShootSession() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const date = new Date();
    data.date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    console.log('Submitted Data', data);
    //await AddSession(data);
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: 'You must enter a value',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="my foo placeholder"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="Foo"
      />
      {errors.type && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

async function AddSession(sessionData: ShootSessionData) {
  try {
    const docRef = await addDoc(collection(db, 'shooting_sessions'), {
      type: sessionData.type,
      bow: sessionData.bow,
      date: sessionData.date,
      note: sessionData.note,
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
