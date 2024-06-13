import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import CustomCard from '../../components/CustomCard';
import { ShootSession } from '../../models/domain/ShootSession';
import { ShootSessionDb } from '../../sqlite/ShootSessionDb';

export default function HistoryPage() {
  const [shootSessions, setShootSessions] = useState<ShootSession[]>([]);
  const shootSessionsDb = ShootSessionDb.GetInstance();

  /*
  Makes effect only run when values are changed, cannot use hooks as we're changing screen
  https://reactnavigation.org/docs/function-after-focusing-screen
  */
  useFocusEffect(
    useCallback(() => {
      shootSessionsDb
        .Fetch()
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
