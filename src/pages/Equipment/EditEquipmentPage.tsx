import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import Button from '../../Components/CustomButton';
import CustomImagePicker from '../../Components/CustomImagePicker';
import CustomNotesInput from '../../Components/CustomNotesInput';
import CustomPicker from '../../Components/CustomPicker';
import CustomTextInput from '../../Components/CustomTextInput';
import { EquipmentType } from '../../Enums/EquipmentType';
import { Equipment } from '../../models/Equipment';
import { bowTypes } from '../../models/data/bowtypes';
import { Bow } from '../../models/domain/Bow';
import { BowDb } from '../../sqlite/BowDb';
import { EquipmentDb } from '../../sqlite/EquipmentDb';
import LocalDb from '../../sqlite/LocalDb';

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

    const equipment = new Equipment();
    equipment.type = EquipmentType.Bow;
    equipment.name = data.name;
    equipment.image = data.image;
    equipment.notes = data.notes;

    const bow = new Bow();
    bow.classification = data.bowType;
    bow.drawWeight = data.drawweight;

    const equipmentDb = EquipmentDb.GetInstance();

    equipmentDb
      .Create(equipment)
      .then(id => {
        console.log(
          `New equipment created with id ${id}, creating child record...`,
        );

        const bowDb = BowDb.GetInstance();
        bowDb
          .Create(bow, id)
          .then(bowId => {
            console.log(
              `New bow child record of equipment ${id} created with id`,
              bowId,
            );
            navigation.goBack();
          })
          .catch(error => {
            console.warn(
              'Failed to create bow child record, rolling back parent with id',
              id,
              error,
            );
            LocalDb.DeleteRecord(LocalDb.EQUIPMENT_TABLE_NAME, id);
          });
      })
      .catch(error => {
        //Display or deal with error
        console.warn(error);
      });
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
