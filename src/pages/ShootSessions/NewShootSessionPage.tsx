import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';
import CustomButton from '../../Components/CustomButton';
import { globalColours } from '../../globalColours';
import { globalStyles } from '../../globalStyles';
import * as RoundData from '../../models/data/rounds.json';

/*
Metadata page for gathering information before a round can be shot such as the type
*/
export default function NewShootSessionPage({ navigation }) {
  return (
    <View style={globalStyles.pageContainer}>
      <CustomButton
        title={RoundData.types.practice.displayName}
        icon={
          <Feather name="target" size={50} color={globalColours.secondary} />
        }
        onPress={() => console.log('Eggs!')}
      />
      <CustomButton
        title={RoundData.types.outdoor.displayName}
        icon={<Feather name="sun" size={50} color={globalColours.secondary} />}
        onPress={() => console.log('Bacon!')}
      />
      <CustomButton
        title={RoundData.types.indoor.displayName}
        icon={<Feather name="home" size={50} color={globalColours.secondary} />}
        onPress={() => console.log('Hello!')}
      />
    </View>
  );
}
