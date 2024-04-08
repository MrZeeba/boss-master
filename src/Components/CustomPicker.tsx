import { Feather } from '@expo/vector-icons';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles } from '../globalStyles';

interface CustomTextInputProps {
  control: Control<any, any>;
  name: string;
  labelText: string;
  data: string[];
  rules: object;
}

/*
A custom text input which uses react-hook-form and wraps away some of the complexity it involves
*/
export default function CustomPicker({
  control,
  name,
  labelText,
  rules = {},
}: CustomTextInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={globalStyles.pageContainer}>
            <Text>{labelText}</Text>
            <TouchableOpacity onPress={Expand}>
              <View
                id="picker-container"
                style={[
                  globalStyles.container,
                  styles.picker,
                  { borderColor: error ? 'red' : styles.picker.borderColor },
                ]}>
                <Text>foo</Text>
                <View style={styles.iconContainer}>
                  <Feather name="chevrons-down" size={24} color="black" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {error && (
            <Text style={styles.inputErrorMessage}>
              {error.message ?? 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );

  function Expand() {
    console.log('Expanding');
  }
}

const styles = StyleSheet.create({
  picker: {
    //https://reactnative.dev/docs/flexbox#:~:text=Layout%20Direction%E2%80%8B&text=By%20default%2C%20React%20Native%20lays,applied%20on%20the%20left%20side.
    flexDirection: 'row',
    alignItems: 'center', //Alignts in one axix (v)
    height: 40,
    borderColor: 'lightgrey',
    borderWidth: 1,
  },

  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },

  inputErrorMessage: {
    color: 'red',
    alignSelf: 'stretch',
  },
});
