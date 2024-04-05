import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import Button from '../Components/Button';
import { Bow } from '../models/Bow';
import { styles } from '../styles';

export function EditEquipmentPage({ route, navigation }) {
  const { id } = route.params;

  useFocusEffect(
    useCallback(() => {
      console.log('User has focused add equipment modal');
    }, []),
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Bow>();

  const onSubmit = handleSubmit(data => console.log(data));

  console.log('errors', errors);

  return (
    <View style={styles.formArea}>
      <Text>Name</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            maxLength={25}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="name"
        rules={{ required: true }}
      />
      <Button title="Save" onPress={onSubmit} />
    </View>
  );
}
