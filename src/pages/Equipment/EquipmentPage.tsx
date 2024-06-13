/*
The root stack for the equipment page
*/
import Feather from '@expo/vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CustomCard from '../../components/CustomCard';
import { globalStyles } from '../../globalStyles';
import { Bow } from '../../models/domain/Bow';
import { BowDb } from '../../sqlite/BowDb';

/*
Equipment is currently just a bow but may be expanded in the future
*/
export default function EquipmentPage({ navigation, route }) {
  const [bowList, setBowList] = useState<Bow[]>([]);

  //A mode in which only selection of bows is available
  const { selectMode } = route.params ?? { selectMode: false };
  const { prevScreen } = route.params ?? { prevScreen: null };

  useFocusEffect(
    useCallback(() => {
      BowDb.GetInstance()
        .Fetch()
        .then(bows => {
          console.log('Bows retrieved', bows);
          setBowList(bows);
        });
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
        {bowList.length > 0 ? (
          bowList.map(equipment => (
            <CustomCard
              key={equipment.id}
              image={equipment.image}
              placeholderImageUri="../../assets/bow_placeholder.png"
              heading={equipment.name}
              fieldOne={equipment.type.displayName}
              fieldTwo={equipment.note}
              onPress={() => (selectMode ? goBack(equipment) : view(equipment))}
            />
          ))
        ) : (
          <Text>No equipment found</Text>
        )}
      </ScrollView>
    </View>
  );

  function goBack(selectedBow: Bow) {
    console.log('Passing equipment back to previous screen', selectedBow);
    navigation.navigate(prevScreen, { bow: selectedBow });
  }

  function view(bow: Bow) {
    throw new Error('Function not implemented.');
  }
}
