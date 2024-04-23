import { ShootSession } from '../models/ShootSession';
import { default as LocalDB, default as LocalDb } from './LocalDb';

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

  async Validate(): Promise<boolean> {
    console.log('Validating schema');
    const db = LocalDb.db;

    await db?.withTransactionAsync(async () => {
      db
        ?.runAsync(
          `CREATE TABLE IF NOT EXISTS ${LocalDB.SHOOTSESSIONS_TABLE_NAME} 
          (id INTEGER PRIMARY KEY AUTOINCREMENT, 
          note TEXT,
          date_shot TEXT,
          bow_id INTEGER NOT NULL,
          FOREIGN KEY (bow_id)
            REFERENCES equipment(id)
          )`,
        )
        .then(fulfilledResult => {
          console.log('Success', fulfilledResult);
          return true;
        })
        .catch(rejectedResult => {
          console.log('Failed', rejectedResult);
          return false;
        })
        .finally(() => console.log('Completed Query'));
    });

    return false;
  }

  Create(session: ShootSession, callback: (id: number | undefined) => void) {
    console.log('Attempting to insert shooting session', { session });

    LocalDB.ExecuteTransaction(
      `INSERT INTO ${LocalDB.SHOOTSESSIONS_TABLE_NAME} (bow_id, note, date_shot) VALUES(?, ?, ?)`,
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
