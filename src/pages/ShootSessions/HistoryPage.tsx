import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { ShootSessionData } from '../../models/ShootSessionData';
import LocalDb from '../../sqlite/LocalDb';

export default function HistoryPage() {
  const [shootSessions, setShootSessions] = useState<ShootSessionData[]>([]);

  /*
  Makes effect only run when values are changed, cannot use hooks as we're changing screen
  https://reactnavigation.org/docs/function-after-focusing-screen
  */
  useFocusEffect(
    useCallback(() => {
      LocalDb.GetAll<ShootSessionData>(LocalDb.SHOOTSESSIONS_TABLE_NAME).then(
        results => {
          setShootSessions(results);
        },
      );
    }, []),
  );

  return shootSessions.map((shootSession: ShootSessionData, index) => {
    console.log('Loaded session', shootSession);
    return (
      <View key={index}>
        <Text>{`date - ${shootSession.dateShot}`}</Text>
        <Text>{`note - ${shootSession.note}`}</Text>
      </View>
    );
  });
}
