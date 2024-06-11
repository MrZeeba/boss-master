import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import Button from '../../components/CustomButton';
import CustomImagePicker from '../../components/CustomImagePicker';
import CustomNotesInput from '../../components/CustomNotesInput';
import CustomPicker from '../../components/CustomPicker';
import CustomTextInput from '../../components/CustomTextInput';
import { bowTypes } from '../../models/data/bowTypes';
import { Bow } from '../../models/domain/Bow';
import { Equipment } from '../../models/domain/Equipment';
import { BowDb } from '../../sqlite/BowDb';

export default function EditEquipmentPage({ navigation }) {
  const maxNameLength: number = 25;
  const [savePressed, setSavePressed] = useState(false);

  useFocusEffect(
    useCallback(() => {
      //console.log('User has focused add equipment modal');
    }, []),
  );

  const {
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm<Equipment>();

  useEffect(
    () => navigation.addListener('beforeRemove', e => BeforeLeave(e)),
    [isDirty, savePressed],
  );

  function SavePressed(data) {
    setSavePressed(true);
    console.log('DATA PASSED FROM FORM', data);
    //const bow = new Bow(id, data);

    const bow = new Bow(
      data.name,
      data.image,
      data.notes,
      data.bowType,
      data.length,
      data.drawweight,
    );

    const bowDb = BowDb.GetInstance();
    bowDb
      .Create(bow)
      .then(bowId => {
        console.log('Inserted Bow with Id', bowId);
        navigation.goBack();
      })
      .catch(error =>
        console.log('An error occured when inserting the bow record', error),
      );
  }

  function BeforeLeave(leaveData) {
    //Only prevent leaving if the user wasn't attempting a save action
    if (isDirty && !savePressed) {
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
  }

  return (
    <View>
      <CustomImagePicker
        name="image"
        control={control}
        placeholderSrc={require('../../../assets/bow_placeholder.png')}
      />
      <CustomPicker
        name="bowType"
        labelText="Type"
        data={bowTypes}
        control={control}
        rules={{ required: 'A type of bow is required' }}
      />
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
      <CustomTextInput
        name="drawweight"
        labelText="Draw Weight (lbs)"
        control={control}
        placeholder="The draw weight/poundage of this bow"
        inputMode="numeric"
        rules={{
          required: 'A draw weight is required',
        }}
      />
      <CustomNotesInput
        name="notes"
        labelText="Notes"
        control={control}
        maxLength={250}
        placeholder="Notes about this piece of equipment"
      />
      <Button title="Save" onPress={handleSubmit(SavePressed)} />
    </View>
  );
}
