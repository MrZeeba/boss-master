import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import CustomCard from '../../components/CustomCard';
import { ShootSession } from '../../models/domain/ShootSession';
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
      <CustomCard
        key={index}
        heading={rehydratedShootSession.dateShot}
        fieldOne={rehydratedShootSession.round.displayName}
        fieldTwo={`In Progress: ${rehydratedShootSession.isDraft}`}
      />
    );
  });
}
