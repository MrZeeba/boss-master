import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';
import CustomButton from '../../Components/CustomButton';
import { globalColours } from '../../globalColours';
import { globalConstants } from '../../globalConstants';
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
        onPress={() => {
          navigation.navigate(globalConstants.routes.practiceSessionPage);
        }}
      />
      <CustomButton
        title={RoundData.types.outdoor.displayName}
        icon={<Feather name="sun" size={50} color={globalColours.secondary} />}
        onPress={() => {
          navigation.navigate(globalConstants.routes.outdoorSessionPage);
        }}
      />
      <CustomButton
        title={RoundData.types.indoor.displayName}
        icon={<Feather name="home" size={50} color={globalColours.secondary} />}
        onPress={() => {
          navigation.navigate(globalConstants.routes.indoorSessionPage);
        }}
      />
    </View>
  );
}
