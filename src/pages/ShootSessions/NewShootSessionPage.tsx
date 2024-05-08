import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import CustomButton from '../../Components/CustomButton';
import CustomCard from '../../Components/CustomCard';
import CustomNotesInput from '../../Components/CustomNotesInput';
import getCurrentDateTime from '../../Helper/Date';
import { globalColours } from '../../globalColours';
import { globalConstants } from '../../globalConstants';
import { globalStyles } from '../../globalStyles';
import { Bow } from '../../models/Bow';
import { ShootSession } from '../../models/ShootSession';
import * as RoundData from '../../models/data/rounds.json';
import { ShootSessionDb } from '../../sqlite/ShootSessionDb';
import { IndoorSessionComponent } from './Components/IndoorSessionComponent';
import { OutdoorSessionComponent } from './Components/OutdoorSessionComponent';

/*
Metadata page for gathering information before a round can be shot such as the type
*/
export default function NewShootSessionPage({ navigation, route }) {
  const [selected, setSelected] = useState('');
  const { bow }: { bow: Bow } = route.params;

  const {
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm<ShootSession>();

  useEffect(() => {
    // Define your function here
    // For example, console.log the selected value
    console.log('Selected value changed:', selected);
  }, [selected]);

  /*
  Save a shoot session to the DB flagging it as a draft
  */
  function SavePressed(data): Promise<number | undefined> {
    const shootSession = new ShootSession();
    shootSession.dateShot = getCurrentDateTime();
    shootSession.note = data.notes;
    shootSession.round = data.roundPicker;
    shootSession.bow = bow;

    console.log(shootSession);

    const db = ShootSessionDb.GetInstance();
    return db.Create(data);
  }

  return (
    <View style={globalStyles.pageContainer}>
      <View>
        <CustomButton
          title="Select Bow"
          onPress={() =>
            navigation.navigate(globalConstants.routes.equipmentPage, {
              selectMode: true,
              prevScreen: globalConstants.routes.newShootSessionPage,
            })
          }
        />
        {bow ? (
          <CustomCard
            image={bow.image}
            placeholderImageUri="../../assets/bow_placeholder.png"
            heading={bow.name}
            fieldOne={bow.type.name}
            fieldTwo={bow.notes}
            disableTap
          />
        ) : null}
      </View>

      <View style={styles.rowContainer}>
        <CustomButton
          title={RoundData.types.outdoor.displayName}
          icon={
            <Feather name="sun" size={50} color={globalColours.secondary} />
          }
          style={[
            styles.rowButton,
            selected === 'outdoor' ? globalStyles.selectedHighlight : null,
          ]}
          onPress={() => {
            setSelected('outdoor');
          }}
        />
        <CustomButton
          title={RoundData.types.indoor.displayName}
          icon={
            <Feather name="home" size={50} color={globalColours.secondary} />
          }
          style={[
            styles.rowButton,
            selected === 'indoor' ? globalStyles.selectedHighlight : null,
          ]}
          onPress={() => {
            setSelected('indoor');
          }}
        />
      </View>
      <View>
        {(() => {
          switch (selected) {
            case 'outdoor':
              return <OutdoorSessionComponent control={control} />;
            case 'indoor':
              return <IndoorSessionComponent control={control} />;
            default:
              return null; // or any other default component or placeholder
          }
        })()}
      </View>
      <CustomNotesInput
        name="notes"
        labelText="Notes"
        control={control}
        maxLength={250}
        placeholder="Additional information you want to include about this session"
      />
      <CustomButton title="Save" onPress={handleSubmit(SavePressed)} />
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  rowButton: {
    flex: 1,
    margin: 5,
  },
});
