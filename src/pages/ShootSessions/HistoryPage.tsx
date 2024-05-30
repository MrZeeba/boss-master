import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Text } from 'react-native';
import CustomCard from '../../Components/CustomCard';
import { ShootSession } from '../../models/ShootSession';
import LocalDb from '../../sqlite/LocalDb';

export default function HistoryPage() {
  const [shootSessions, setShootSessions] = useState<ShootSession[]>([]);

  /*
  Makes effect only run when values are changed, cannot use hooks as we're changing screen
  https://reactnavigation.org/docs/function-after-focusing-screen
  */
  useFocusEffect(
    useCallback(() => {
      LocalDb.GetAll<ShootSession>(LocalDb.SHOOTSESSION_TABLE_NAME)
        .then(results => {
          setShootSessions(results);
        })
        .catch(error =>
          console.error('Critical error loading history results', error),
        );
    }, []),
  );

  return shootSessions.map((shootSession: ShootSession, index) => {
    const rehydratedShootSession = ShootSession.fromPlainObject(shootSession);
    return (
      <>
        <Text>In Progress</Text>
        <CustomCard
          key={index}
          heading={rehydratedShootSession.dateShot}
          fieldOne={rehydratedShootSession.round.displayName}
          fieldTwo="End of 1 of x"
        />
        <Text>All Time</Text>
      </>
    );
  });
}
