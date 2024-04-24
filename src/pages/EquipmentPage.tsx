/*
The root stack for the equipment page
*/
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CustomCard from '../Components/CustomCard';
import { globalStyles } from '../globalStyles';
import { Equipment } from '../models/Equipment';
import LocalDB from '../sqlite/LocalDb';

/*
Equipment is currently just a bow but may be expanded in the future
*/
export default function EquipmentPage({ navigation }) {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);

  useFocusEffect(
    useCallback(() => {
      LocalDB.GetAll<Equipment>(LocalDB.EQUIPMENT_TABLE_NAME)
        .then(results => setEquipmentList(results))
        .catch(error =>
          console.error('Critical error loading equipment results', error),
        );
    }, []),
  );

  //Hook into the header add item icon
  useEffect(() => {
    // Use `setOptions` to setup the button
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('EditEquipmentPage')}>
          <Feather
            name="plus"
            size={32}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  console.log(equipmentList.length);
  return (
    <View style={globalStyles.pageContainer}>
      <ScrollView>
        {equipmentList.length > 0 ? (
          equipmentList.map(equipment => (
            <CustomCard
              key={equipment.id}
              image={equipment.image}
              placeholderImageUri="../../assets/bow_placeholder.png"
              heading={equipment.name}
              fieldOne={equipment.type.name}
              fieldTwo={equipment.notes}
            />
          ))
        ) : (
          <Text>No equipment found</Text>
        )}
      </ScrollView>
    </View>
  );
}
