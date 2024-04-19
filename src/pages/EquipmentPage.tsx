/*
The root stack for the equipment page
*/
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import CustomCard from '../Components/CustomCard';
import { globalStyles } from '../globalStyles';
import { Equipment } from '../models/Equipment';
import { GetAll } from '../sqlite/LocalDb';

/*
Equipment is currently just a bow but may be expanded in the future
*/
export default function EquipmentPage({ navigation }) {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);

  useFocusEffect(
    useCallback(() => {
      GetAll<Equipment>('equipment', results => setEquipmentList(results));
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

  return (
    <View style={globalStyles.pageContainer}>
      {equipmentList.map(equipment => {
        return (
          <ScrollView key={equipment.id}>
            <CustomCard
              image={equipment.image}
              placeholderImageUri="../../assets/bow_placeholder.png"
              heading={equipment.name}
              fieldOne={equipment.type.name}
              fieldTwo={equipment.notes}
            />
          </ScrollView>
        );
      })}
    </View>
  );
}
