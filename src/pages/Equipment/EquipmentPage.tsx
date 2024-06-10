/*
The root stack for the equipment page
*/
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CustomCard from '../../components/CustomCard';
import { globalStyles } from '../../globalStyles';
import { Equipment } from '../../models/domain/Equipment';
import { EquipmentEnt } from '../../models/entity/EquipmentEnt';
import LocalDb from '../../sqlite/LocalDb';

/*
Equipment is currently just a bow but may be expanded in the future
*/
export default function EquipmentPage({ navigation, route }) {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);

  //A mode in which only selection of bows is available
  const { selectMode } = route.params ?? { selectMode: false };
  const { prevScreen } = route.params ?? { prevScreen: null };

  useFocusEffect(
    useCallback(() => {
      LocalDb.GetAll(LocalDb.EQUIPMENT_TABLE_NAME, () => new EquipmentEnt())
        .then(results => {
          console.log('Results from DB:', results);

          const equipment = results.map(x => x.toDomain() as Equipment);

          setEquipmentList(equipment);
        })
        .catch(error =>
          console.error('Critical error loading equipment results', error),
        );
    }, []),
  );

  //Hook into the header add item icon
  useEffect(() => {
    if (!selectMode) {
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
    }
  }, [navigation]);

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
              fieldOne={equipment.type.displayName}
              fieldTwo={equipment.notes}
              onPress={() => (selectMode ? goBack(equipment) : view(equipment))}
            />
          ))
        ) : (
          <Text>No equipment found</Text>
        )}
      </ScrollView>
    </View>
  );

  function goBack(selectedEquipment: Equipment) {
    console.log('Passing equipment back to previous screen', selectedEquipment);
    navigation.navigate(prevScreen, { bow: selectedEquipment });
  }

  function view(equipment: Equipment) {
    throw new Error('Function not implemented.');
  }
}
