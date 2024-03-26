import { Controller, useForm } from 'react-hook-form';
import { Button, Text, TextInput, View } from 'react-native';
import { AddSession } from '../firebase/database';
import { ShootSessionData } from '../models/ShootSession';

export default function EditShootSession() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ShootSessionData>();

  const onSubmit = async data => {
    const date = new Date();
    data.date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    console.log('Submitted Data', data);
    await AddSession(data);
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
        name="type"
      />
      {errors.type && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
