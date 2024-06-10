import { SQLiteBindParams } from 'expo-sqlite/next';
import { ITable } from '../interfaces/ITable';
import { ShootSessionEnt } from '../models/entity/ShootSessionEnt';
import LocalDb from './LocalDb';

/*
Validates the schema for this table
*/
export class ShootSessionDb implements ITable<ShootSessionEnt> {
  private static instance: ShootSessionDb;

  private constructor() {}

  static GetInstance(): ShootSessionDb {
    if (!this.instance) this.instance = new ShootSessionDb();
    return this.instance;
  }

  Validate(): Promise<boolean> {
    const sql = `
      CREATE TABLE IF NOT EXISTS ${LocalDb.SHOOTSESSION_TABLE_NAME} (
      "id"	INTEGER,
      "note"	TEXT,
      "roundJson" TEXT,
      "dateShot"	TEXT,
      "bowId"	INTEGER NOT NULL,
      "isDraft"	INTEGER,
      PRIMARY KEY("id" AUTOINCREMENT),
      FOREIGN KEY("bowId") REFERENCES "equipment"("id")
    );`;

    return LocalDb.Validate(sql, LocalDb.SHOOTSESSION_TABLE_NAME);
  }

  Restructure(): void {
    LocalDb.DropTable(LocalDb.SHOOTSESSION_TABLE_NAME)
      .then(() =>
        this.Validate().then(() => console.log('Successfully restructured')),
      )
      .catch(error => console.error(error));
  }

  /*
  Cleans up old shoot session drafts
  */
  CleanUpDrafts() {
    //older than last week
  }

  async GetDraft(): Promise<ShootSessionEnt | undefined> {
    const sql: string = `SELECT * FROM ${LocalDb.SHOOTSESSION_TABLE_NAME} WHERE isDraft = ? ORDER BY dateShot DESC LIMIT 1`;

    const params: SQLiteBindParams = [1];

    return LocalDb.GetBySQL<ShootSessionEnt>(sql, params)
      .then(shootSessions => {
        const shootSession = shootSessions[0];
        return shootSession ?? undefined;
      })
      .catch(error => {
        console.warn('Unable to retrieve draft', error);
        return undefined;
      });
  }

  Create(session: ShootSessionEnt): Promise<number | undefined> {
    console.log('Attempting to insert shooting session', session);

    const sql: string = `INSERT INTO ${LocalDb.SHOOTSESSION_TABLE_NAME} (bowId, roundJson, note, dateShot, isDraft) VALUES (?, ?, ?, ?, ?)`;

    const params: SQLiteBindParams = [
      session.bowId,
      session.roundJson,
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

  async Delete(shootSessionId) {
    return LocalDb.DeleteRecord(
      LocalDb.SHOOTSESSION_TABLE_NAME,
      shootSessionId,
    );
  }
}
