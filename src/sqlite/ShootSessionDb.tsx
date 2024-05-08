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
      "round" TEXT,
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

  Create(session: ShootSession): Promise<number | undefined> {
    console.log('Attempting to insert shooting session', session);

    console.warn('THIS IS THE BOW', session.bow);

    const sql: string = `INSERT INTO ${LocalDb.SHOOTSESSION_TABLE_NAME} (bow_id, round, note, date_shot, is_draft) VALUES (?, ?, ?, ?, ?)`;

    const params: SQLiteBindParams = [
      session.bow.type.id,
      session.round,
      session.note,
      session.dateShot,
      true,
    ];

    return LocalDb.Insert(sql, params)
      .then(id => {
        return id;
      })
      .catch(error => {
        console.error(error);
        return undefined;
      });
  }
}
