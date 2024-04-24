import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { globalColours } from '../globalColours';
import { globalStyles } from '../globalStyles';

interface CustomTextInputProps {
  control: Control<any, any>;
  name: string;
  labelText: string;
  placeholder?: string;
  maxLength?: number;
  maxLines?: number;
  rules?: object;
}

/*
A custom note input which uses react-hook-form and wraps away some of the complexity it involves
*/
export default function CustomNotesInput({
  control,
  name,
  labelText,
  placeholder,
  maxLength,
  maxLines = 5,
  rules = {},
}: CustomTextInputProps) {
  const calculateHeight = () => {
    return {
      height:
        maxLines * globalStyles.text.lineHeight * globalStyles.text.fontSize,
    };
  };

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
                calculateHeight(),
                globalStyles.container,
                styles.input,
                {
                  borderColor: error
                    ? globalColours.errorBorder
                    : styles.input.borderColor,
                },
              ]}
              multiline
              numberOfLines={maxLines}
              maxLength={maxLength}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={placeholder}
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
    borderColor: globalColours.border,
    borderWidth: 1,
    verticalAlign: 'top',
  },

  inputErrorMessage: {
    color: globalColours.errorBorder,
    alignSelf: 'stretch',
  },
});
