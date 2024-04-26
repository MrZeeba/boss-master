import { SQLiteBindParams } from 'expo-sqlite/next';
import { ShootSession } from '../models/ShootSession';
import LocalDb from './LocalDb';

/*
Validates the schema for this table
*/
export class ShootSessionDb implements ITable<ShootSession> {
  private static instance: ShootSessionDb;

  private constructor() {}

  static GetInstance(): ShootSessionDb {
    if (!this.instance) this.instance = new ShootSessionDb();
    return this.instance;
  }

  Validate() {
    const sql = `
      CREATE TABLE IF NOT EXISTS ${LocalDb.SHOOTSESSION_TABLE_NAME} (
      "id"	INTEGER,
      "note"	TEXT,
      "dateShot"	TEXT,
      "bow_id"	INTEGER NOT NULL,
      "is_draft"	INTEGER,
      PRIMARY KEY("id" AUTOINCREMENT),
      FOREIGN KEY("bow_id") REFERENCES "equipment"("id")
    );`;

    LocalDb.Validate(sql, LocalDb.SHOOTSESSION_TABLE_NAME);
  }

  /*
  Cleans up old shoot session drafts
  */
  CleanUpDrafts() {
    //older than last week
  }

  async GetDraft(): Promise<ShootSession | undefined> {
    const sql: string = `SELECT * FROM ${LocalDb.SHOOTSESSION_TABLE_NAME} WHERE is_draft = ? ORDER BY dateshot DESC LIMIT 1`;

    const params: SQLiteBindParams = [1];

    return LocalDb.GetBySQL<ShootSession>(sql, params)
      .then(shootSession => {
        return shootSession[0]; // Assuming GetBySQL returns an array
      })
      .catch(error => {
        console.warn('Unable to retrieve draft', error);
        return undefined;
      });
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
