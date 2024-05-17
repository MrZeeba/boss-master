import { Feather } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ShootSession } from '../../models/ShootSession';
import LocalDb from '../../sqlite/LocalDb';

/*
An active scoring session. This is someone in the middle of shooting a round
*/
export default function EditScorecardPage({ navigation, route }) {
  const { session }: { session: ShootSession } = route.params;
  const rehydratedSession = ShootSession.fromPlainObject(session);

  useEffect(() => {
    navigation.setOptions({
      title: rehydratedSession.round.displayName,
      headerRight: () => (
        <TouchableOpacity onPress={() => DiscardDraft()}>
          <Feather
            name="delete"
            size={32}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  //Where should the buttons be for discarding/saving? they shouldn't be easily pressed
  //We should auto-save every end

  return (
    <View>
      <Text>{rehydratedSession.dateShot}</Text>
      <Text>{rehydratedSession.round.displayName}</Text>
      <Text>End 1 of 4</Text>
      <Text>Arrow 1 of 6</Text>
    </View>
  );

  function DiscardDraft() {
    if (rehydratedSession.id !== undefined) {
      LocalDb.DeleteRecord(
        LocalDb.SHOOTSESSION_TABLE_NAME,
        rehydratedSession.id,
      ).then(navigation.goBack());
    }
  }
}
