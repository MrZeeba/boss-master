import { Control, Controller } from 'react-hook-form';
import {
  InputModeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { globalColours } from '../globalColours';
import { globalStyles } from '../globalStyles';

interface CustomTextInputProps {
  control: Control<any, any>;
  name: string;
  labelText: string;
  inputMode: InputModeOptions;
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
  labelText,
  placeholder,
  inputMode = 'text',
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
          <View style={globalStyles.pageContainer}>
            <Text>{labelText}</Text>
            <TextInput
              style={[
                globalStyles.container,
                styles.input,
                {
                  borderColor: error
                    ? globalColours.errorBorder
                    : styles.input.borderColor,
                },
              ]}
              maxLength={maxLength}
              inputMode={inputMode}
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
  input: {
    height: 40,
    borderColor: globalColours.border,
    borderWidth: 1,
  },

  inputErrorMessage: {
    color: globalColours.errorBorder,
    alignSelf: 'stretch',
  },
});
