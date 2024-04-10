import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, StyleSheet, View } from 'react-native';
import Button from '../Components/CustomButton';
import CustomNotesInput from '../Components/CustomNotesInput';
import CustomPicker from '../Components/CustomPicker';
import CustomTextInput from '../Components/CustomTextInput';
import { BowType } from '../Enums/BowType';
import { EquipmentType } from '../Enums/EquipmentType';
import EnumToMap from '../Enums/Helper';
import { Bow } from '../models/Bow';
import { Equipment } from '../models/Equipment';
import { EquipmentDb } from '../sqlite/EquipmentDb';

export function EditEquipmentPage({ navigation }) {
  const maxNameLength: number = 25;
  const [savePressed, setSavePressed] = useState(false);

  useFocusEffect(
    useCallback(() => {
      console.log('User has focused add equipment modal');
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

  console.log(errors);

  function SavePressed(data) {
    setSavePressed(true);
    console.log(data);
    //const bow = new Bow(id, data);

    const equipment = new Equipment();
    equipment.type = EquipmentType.Bow;
    equipment.name = data.name;

    const bow = new Bow();

    EquipmentDb.Create(equipment, id => {
      console.log(`New equipment created with id ${id}`);
      navigation.goBack();
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
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/bow_placeholder.png')}
        />
      </View>
      <CustomPicker
        name="bowType"
        labelText="Type"
        data={EnumToMap(BowType)}
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

const styles = StyleSheet.create({
  image: {
    //tintColor: globalColours.primary,
    //backgroundColor: 'blue',
    //Undo scale from container to prevent image distortion
    transform: [{ scaleX: 0.5 }],
    alignSelf: 'center',
    flex: 1,
    width: '50%',
    height: '50%',
  },

  imageContainer: {
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    overflow: 'hidden',
    height: 200,
    transform: [{ scaleX: 2 }],
    backgroundColor: 'darkgrey',
  },
});
