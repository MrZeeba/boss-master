import { Control, Controller } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { styles } from '../styles';

interface CustomTextInputProps {
  control: Control<any, any>;
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  maxLength?: number;
}

/*
A custom text input which uses react-hook-form and wraps away some of the complexity it involves
*/
export default function CustomTextInput({
  control,
  name,
  placeholder,
  secureTextEntry,
  maxLength,
}: CustomTextInputProps) {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur } }) => (
          <TextInput
            style={styles.textInput}
            maxLength={maxLength}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />
        )}
        rules={{ required: true }}
      />
    </View>
  );
}
