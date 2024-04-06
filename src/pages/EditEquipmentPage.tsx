import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import Button from '../Components/CustomButton';
import CustomTextInput from '../Components/CustomTextInput';
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

  console.log(errors);

  function SavePressed(data) {
    console.log(data);
    console.log(id);
    //const bow = new Bow(id, data);
  }

  return (
    <View style={styles.formArea}>
      <Text>Name</Text>
      <CustomTextInput
        name="name"
        control={control}
        placeholder="A name for your bow i.e. Hoyt Matrix"
        maxLength={25}
        rules={{
          required: 'A name is required',
          minLength: {
            value: 3,
            message: 'Name must be at least 3 characters',
          },
        }}
      />
      <Button title="Save" onPress={handleSubmit(SavePressed)} />
    </View>
  );
}
