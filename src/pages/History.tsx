import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { ShootSession } from '../models/ShootSession';
import { GetSessions } from '../sqlite/LocalDb';

export default function History() {
  const [shootSessions, setShootSessions] = useState<ShootSession[]>([]);

  /*
  Makes effect only run when values are changed, cannot use hooks as we're changing screen
  https://reactnavigation.org/docs/function-after-focusing-screen
  */
  useFocusEffect(
    useCallback(() => {
      GetSessions(results => setShootSessions(results));
    }, []),
  );

  return shootSessions.map((shootSession: ShootSession, index) => {
    return (
      <View key={index}>
        <Text>{`bow - ${shootSession.bow.type}`}</Text>
        <Text>{`date - ${shootSession.date}`}</Text>
        <Text>{`note - ${shootSession.note}`}</Text>
      </View>
    );
  });
}
