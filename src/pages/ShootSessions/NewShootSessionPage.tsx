import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from '../../Components/CustomButton';
import { globalColours } from '../../globalColours';
import { globalStyles } from '../../globalStyles';
import * as RoundData from '../../models/data/rounds.json';
import { IndoorSessionComponent } from './Components/IndoorSessionComponent';
import { OutdoorSessionComponent } from './Components/OutdoorSessionComponent';

/*
Metadata page for gathering information before a round can be shot such as the type
*/
export default function NewShootSessionPage({ navigation }) {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    // Define your function here
    // For example, console.log the selected value
    console.log('Selected value changed:', selected);
  }, [selected]);

  return (
    <View style={globalStyles.pageContainer}>
      <CustomButton
        title="Select Bow"
        onPress={() => console.log('Select bow was pressed')}
      />
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
              return <OutdoorSessionComponent />;
            case 'indoor':
              return <IndoorSessionComponent />;
            default:
              return null; // or any other default component or placeholder
          }
        })()}
      </View>
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
