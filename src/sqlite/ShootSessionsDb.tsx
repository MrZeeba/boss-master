import { ShootSession } from '../models/ShootSession';
import LocalDB from './LocalDb';

/*
Validates the schema for this table
*/
export class ShootSessionsDb implements ITable<ShootSession> {
  private static instance: ShootSessionsDb;

  private constructor() {}

  static GetInstance(): ShootSessionsDb {
    if (!this.instance) this.instance = new ShootSessionsDb();
    return this.instance;
  }

  Validate(): boolean {
    LocalDB.ExecuteTransaction(
      `CREATE TABLE IF NOT EXISTS ${LocalDB.SHOOTSESSIONS_TABLE_NAME} 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
     note TEXT,
     dateShot TEXT,
     bow_id INTEGER NOT NULL,
     FOREIGN KEY (bow_id)
      REFERENCES equipment(id)
     )`,
      undefined,
      () => {
        console.log(`Validate ${LocalDB.SHOOTSESSIONS_TABLE_NAME}: SUCCESS`);
      },
      (_, error) => {
        LocalDB.ValidationError(ShootSessionsDb.name, error);
        return false;
      },
    );

    return true;
  }

  Create(session: ShootSession, callback: (id: number | undefined) => void) {
    console.log('Attempting to insert shooting session', { session });

    LocalDB.ExecuteTransaction(
      `INSERT INTO ${LocalDB.SHOOTSESSIONS_TABLE_NAME} (bow_id, note, dateShot) VALUES(?, ?, ?)`,
      [session.bow.type.id, session.note, session.dateShot],
      (_, resultSet) => {
        callback(resultSet.insertId);
      },
      (_, error) => {
        console.warn(error);
        callback(undefined);
        return false;
      },
    );
  }
}
