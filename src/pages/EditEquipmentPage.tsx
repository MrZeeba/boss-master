import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import Button from '../Components/CustomButton';
import CustomTextInput from '../Components/CustomTextInput';
import { Bow } from '../models/Bow';
import { styles } from '../styles';

export function EditEquipmentPage({ route, navigation }) {
  const [formStatus, setFormStatus] = useState();
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

  function SavePressed(data) {
    console.log(data);
  }

  return (
    <View style={styles.formArea}>
      <Text>Name</Text>
      <CustomTextInput
        name="name"
        control={control}
        placeholder="A name for your bow i.e. Hoyt Matrix"
        secureTextEntry={false}
        maxLength={25}
      />
      <Button title="Save" onPress={handleSubmit(SavePressed)} />
    </View>
  );
}
