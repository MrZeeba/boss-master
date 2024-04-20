import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalColours } from '../globalColours';
import { globalStyles } from '../globalStyles';
import { DropdownObject } from '../models/DropdownObject';

interface CustomTextInputProps {
  control: Control<any, any>;
  name: string;
  labelText: string;
  data: { [key: string]: DropdownObject };
  defaultValue?: string;
  onSelect?: (value: string) => void;
  rules: object;
}
/*
A custom text input which uses react-hook-form and wraps away some of the complexity it involves
*/
export default function CustomPicker({
  control,
  name,
  labelText,
  data,
  defaultValue,
  onSelect,
  rules = {},
}: CustomTextInputProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  if (defaultValue !== undefined) {
    if (!Object.keys(data).includes(defaultValue))
      console.error(
        'Data values passed into Custom Picker do contain default value',
        defaultValue,
      );
  }

  function handleSelect(item: string): void {
    setSelectedItem(item);
    setDropdownVisible(false);
    //Call any subscribers to the exposed onchange method
    onSelect?.(item);
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <>
          <View style={globalStyles.pageContainer}>
            <Text>{labelText}</Text>
            <TouchableOpacity
              onPress={() => setDropdownVisible(!dropdownVisible)}>
              <View
                id="picker-container"
                style={[
                  globalStyles.container,
                  styles.picker,
                  { borderColor: error ? 'red' : styles.picker.borderColor },
                ]}>
                <Text>{selectedItem}</Text>
                <View style={styles.iconContainer}>
                  <Feather
                    name={dropdownVisible ? 'chevrons-up' : 'chevrons-down'}
                    size={24}
                    color="black"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {dropdownVisible && (
              <Dropdown
                data={data}
                onSelect={handleSelect}
                hookOnChange={onChange}
              />
            )}
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

  //onSelect is a function we pass in. This function uses the intersect operator (&) to take in onSelect too
  function Dropdown({
    data,
    onSelect,
    hookOnChange,
  }: {
    data: { [key: string]: DropdownObject };
    onSelect: (item: string) => void;
    hookOnChange: (value: DropdownObject) => void;
  }) {
    return (
      <View style={globalStyles.container}>
        {Object.values(data).map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              onSelect(item.name);
              //To pass validation for react hook form
              hookOnChange(item);
            }}>
            <Text
              style={
                Object.values(data).indexOf(item) > 0
                  ? [styles.item, styles.upperItemBorder]
                  : styles.item //First item should not have an upper border
              }>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    //https://reactnative.dev/docs/flexbox#:~:text=Layout%20Direction%E2%80%8B&text=By%20default%2C%20React%20Native%20lays,applied%20on%20the%20left%20side.
    flexDirection: 'row',
    alignItems: 'center', //Alignts in one axix (v)
    height: 40,
    borderColor: globalColours.border,
    borderWidth: 1,
  },

  item: {
    paddingTop: 10,
    paddingBottom: 10,
  },

  upperItemBorder: {
    borderTopWidth: 1,
    borderColor: globalColours.separator,
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
