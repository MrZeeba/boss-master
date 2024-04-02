import { ShootSession } from '../models/ShootSession';
import { GetDatabase } from './LocalDb';

const tableName = 'shootsessions';

/*
Validates the schema for this table
*/
export function Validate() {
  const db = GetDatabase();

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tableName} 
        (id INTEGER PRIMARY KEY AUTOINCREMENT, 
         note TEXT,
         dateShot TEXT,
         bow_id INTEGER NOT NULL,
         FOREIGN KEY (bow_id)
          REFERENCES equipment(id)
         )`,
      undefined,
      (_, result) => {
        console.log(`Validation of ${tableName} complete`, result);
      },
    );
  });
}

/*
Add a session to the database
*/
export function Create(
  session: ShootSession,
  callback: (id: number | undefined) => void,
) {
  console.log('Attempting to insert shooting session', { session });
  const db = GetDatabase();

  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO ${tableName} (bow_id, note, dateShot) VALUES(?, ?, ?)`,
      [session.bow.type, session.note, session.dateShot],
      (_, resultSet) => {
        callback(resultSet.insertId);
      },
      (_, error) => {
        console.warn(error);
        callback(undefined);
        return false;
      },
    );
  });
}
