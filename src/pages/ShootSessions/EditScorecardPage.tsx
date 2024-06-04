import { Feather } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import EndView from '../../Components/EndView';
import ScoreSelector from '../../Components/ScoreSelector';
import { globalStyles } from '../../globalStyles';
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
      title: `${rehydratedSession.round.displayName} (In Progress)`,
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

  //Adds a score to the current session
  function addScore(score: number) {
    console.log('User has entered an arrow score of ', score);
    rehydratedSession.AddEndScore(score);
  }

  //Where should the buttons be for discarding/saving? they shouldn't be easily pressed
  //We should auto-save every end

  return (
    <View style={globalStyles.pageContainer}>
      <Text>{rehydratedSession.dateShot}</Text>
      <Text>{rehydratedSession.round.displayName}</Text>
      <Text>End 1 of 4</Text>
      <Text>Arrow 1 of 6</Text>
      <EndView />
      <ScoreSelector
        scoringType={rehydratedSession.round.zoneScoring}
        addScore={score => addScore(score)}
      />
    </View>
  );

  function DiscardDraft() {
    if (rehydratedSession.id !== undefined) {
      console.log('Discarding draft', rehydratedSession.id);
      LocalDb.DeleteRecord(
        LocalDb.SHOOTSESSION_TABLE_NAME,
        rehydratedSession.id,
      ).then(navigation.goBack());
    }
  }
}
