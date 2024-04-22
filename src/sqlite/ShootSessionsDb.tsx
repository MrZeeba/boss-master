import { ShootSession } from '../models/ShootSession';
import { GetDatabase, ValidationError } from './LocalDb';

/*
Validates the schema for this table
*/
export const ShootSessionsDb: DbTable<ShootSession> = {
  tableName: 'shootsessions',

  Validate() {
    const db = GetDatabase();

    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${this.tableName} 
          (id INTEGER PRIMARY KEY AUTOINCREMENT, 
           note TEXT,
           dateShot TEXT,
           bow_id INTEGER NOT NULL,
           FOREIGN KEY (bow_id)
            REFERENCES equipment(id)
           )`,
        undefined,
        () => {
          console.log(`Validate ${this.tableName}: SUCCESS`);
        },
        (_, error) => {
          ValidationError(error);
          return false;
        },
      );
    });
  },

  Create(session: ShootSession, callback: (id: number | undefined) => void) {
    console.log('Attempting to insert shooting session', { session });
    const db = GetDatabase();

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ${this.tableName} (bow_id, note, dateShot) VALUES(?, ?, ?)`,
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
  },
};
