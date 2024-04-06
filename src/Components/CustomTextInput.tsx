import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface CustomTextInputProps {
  control: Control<any, any>;
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  maxLength?: number;
  rules: object;
}

/*
A custom text input which uses react-hook-form and wraps away some of the complexity it involves
*/
export default function CustomTextInput({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  maxLength,
  rules = {},
}: CustomTextInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? 'red' : styles.container.borderColor },
            ]}>
            <TextInput
              style={styles.input}
              maxLength={maxLength}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
            />
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 4,
  },

  input: {
    height: 40,
    padding: 10,
  },

  inputErrorMessage: {
    color: 'red',
    alignSelf: 'stretch',
  },
});
