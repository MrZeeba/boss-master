import { Feather } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import EndView from '../../components/EndView';
import ScoreSelector from '../../components/ScoreSelector';
import { globalStyles } from '../../globalStyles';
import { ShootSession } from '../../models/domain/ShootSession';
import LocalDb from '../../sqlite/LocalDb';

/*
An active scoring session. This is someone in the middle of shooting a round
*/
export default function EditScorecardPage({ navigation, route }) {
  const { session }: { session: ShootSession } = route.params;
  console.log(session);
  const foo = session.toEntity();
  console.log('hello', foo);
  //Do I need to rehydrate here?

  useEffect(() => {
    navigation.setOptions({
      title: `${session.round.displayName} (In Progress)`,
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
    session.AddEndScore(score);
  }

  //Where should the buttons be for discarding/saving? they shouldn't be easily pressed
  //We should auto-save every end

  return (
    <View style={globalStyles.pageContainer}>
      <Text>{session.dateShot}</Text>
      <Text>{session.round.displayName}</Text>
      <Text>End 1 of 4</Text>
      <Text>Arrow 1 of 6</Text>
      <EndView />
      <ScoreSelector
        scoringType={session.round.zoneScoring}
        addScore={score => addScore(score)}
      />
    </View>
  );

  function DiscardDraft() {
    if (session.id !== undefined) {
      console.log('Discarding draft', session.id);
      LocalDb.DeleteRecord(LocalDb.SHOOTSESSION_TABLE_NAME, session.id).then(
        navigation.goBack(),
      );
    }
  }
}
