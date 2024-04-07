import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import Button from '../Components/CustomButton';
import CustomTextInput from '../Components/CustomTextInput';
import { Equipment } from '../models/Equipment';
import { styles } from '../styles';

export function EditEquipmentPage({ route, navigation }) {
  const { id } = route.params;

  const maxNameLength: number = 25;

  useFocusEffect(
    useCallback(() => {
      console.log('User has focused add equipment modal');
    }, []),
  );

  useEffect(() =>
    navigation.addListener('beforeRemove', e => CancelPressed(e)),
  );

  const {
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm<Equipment>();

  console.log(`is the form dirty ${isDirty}`);
  console.log(errors);

  function SavePressed(data) {
    console.log(data);
    console.log(id);
    //const bow = new Bow(id, data);
  }

  function CancelPressed(leaveData) {
    if (isDirty) {
      leaveData.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Discard',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
              navigation.dispatch(leaveData.data.action);
            },
          },
        ],
      );
    }
    //Give ID back to the database by deleting record
  }

  return (
    <View style={styles.formArea}>
      <CustomTextInput
        name="name"
        labelText="Name"
        control={control}
        placeholder="A name for your bow i.e. Hoyt Matrix"
        inputMode="text"
        maxLength={maxNameLength}
        rules={{
          required: 'A name is required',
          minLength: {
            value: 3,
            message: 'Name must be at least 3 characters',
          },
          maxLength: {
            value: maxNameLength,
            message: `Name must be no more than ${maxNameLength} characters`,
          },
        }}
      />
      <Button title="Save" onPress={handleSubmit(SavePressed)} />
    </View>
  );
}
