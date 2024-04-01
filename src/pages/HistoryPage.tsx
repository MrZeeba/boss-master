import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { ShootSession } from '../models/ShootSession';
import { GetAll } from '../sqlite/LocalDb';

export default function HistoryPage() {
  const [shootSessions, setShootSessions] = useState<ShootSession[]>([]);

  /*
  Makes effect only run when values are changed, cannot use hooks as we're changing screen
  https://reactnavigation.org/docs/function-after-focusing-screen
  */
  useFocusEffect(
    useCallback(() => {
      GetAll<ShootSession>('shootsessions', results =>
        setShootSessions(results),
      );
    }, []),
  );

  return shootSessions.map((shootSession: ShootSession, index) => {
    console.log('Loaded session', shootSession);
    return (
      <View key={index}>
        <Text>{`date - ${shootSession.dateShot}`}</Text>
        <Text>{`note - ${shootSession.note}`}</Text>
      </View>
    );
  });
}
