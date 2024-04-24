import { ShootSession } from '../models/ShootSessionData';
import LocalDb, { default as LocalDB } from './LocalDb';

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

  Validate() {
    const sql = `CREATE TABLE IF NOT EXISTS ${LocalDB.SHOOTSESSION_TABLE_NAME} 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    note TEXT,
    date_shot TEXT,
    bow_id INTEGER NOT NULL,
    FOREIGN KEY (bow_id)
      REFERENCES equipment(id)
    )`;

    LocalDb.Validate(sql, LocalDB.SHOOTSESSION_TABLE_NAME);
  }

  Create(session: ShootSession, callback: (id: number | undefined) => void) {
    console.log('Attempting to insert shooting session', { session });

    LocalDB.ExecuteTransaction(
      `INSERT INTO ${LocalDB.SHOOTSESSION_TABLE_NAME} (bow_id, note, date_shot) VALUES(?, ?, ?)`,
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
