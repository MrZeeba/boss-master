import { SQLiteBindParams } from 'expo-sqlite/next';
import { ITable } from '../interfaces/ITable';
import { Bow } from '../models/domain/Bow';
import { ShootSession } from '../models/domain/ShootSession';
import { BowEnt } from '../models/entity/BowEnt';
import { ShootSessionEnt } from '../models/entity/ShootSessionEnt';
import LocalDb from './LocalDb';

/*
Validates the schema for this table
*/
export class ShootSessionDb implements ITable<ShootSession> {
  private static instance: ShootSessionDb;

  static GetInstance(): ShootSessionDb {
    if (!this.instance) this.instance = new ShootSessionDb();
    return this.instance;
  }

  Validate(): Promise<boolean> {
    const sql = `
      CREATE TABLE IF NOT EXISTS ${LocalDb.SHOOTSESSION_TABLE_NAME} (
      "id"	INTEGER,
      "note"	TEXT,
      "round_json" TEXT,
      "date_shot"	TEXT,
      "bow_id"	INTEGER NOT NULL,
      "is_draft"	INTEGER,
      PRIMARY KEY("id" AUTOINCREMENT),
      FOREIGN KEY("bow_id") REFERENCES "bow"("id")
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

  Fetch(): Promise<ShootSession[]> {
    console.log('Fetching shoot session records');

    return new Promise<ShootSession[]>((resolve, reject) => {
      const db = LocalDb.GetDatabaseInstance();

      const sql = `SELECT * FROM ${LocalDb.SHOOTSESSION_TABLE_NAME}`;

      db.getAllAsync<ShootSessionEnt>(sql)
        .then(async rows => {
          const sessions = await Promise.all(
            rows.map(async r => {
              const bowEnt = await LocalDb.GetById<BowEnt>(
                LocalDb.BOW_TABLE_NAME,
                r.bow_id,
              );

              if (!bowEnt) {
                throw new Error(`Bow not found for bow_id: ${r.bow_id}`);
              }

              const bow = Bow.FromRow(bowEnt);
              return new ShootSession(
                r.id,
                r.date_shot,
                bow,
                r.note,
                JSON.parse(r.round_json),
                r.is_draft,
              );
            }),
          );
          resolve(sessions);
        })
        .catch(err => reject(err));
    });
  }

  /*
  Cleans up old shoot session drafts
  */
  CleanUpDrafts() {
    //older than last week
  }

  async GetDraft(): Promise<ShootSessionEnt | undefined> {
    const sql: string = `SELECT * FROM ${LocalDb.SHOOTSESSION_TABLE_NAME} WHERE is_draft = ? ORDER BY date_shot DESC LIMIT 1`;

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

  Create(session: ShootSession): Promise<number> {
    console.log('Attempting to insert shooting session', session);

    const sql: string = `INSERT INTO ${LocalDb.SHOOTSESSION_TABLE_NAME} (bow_id, round_json, note, date_shot, is_draft) VALUES (?, ?, ?, ?, ?)`;

    const params: SQLiteBindParams = [
      session.bow.id ?? -1,
      JSON.stringify(session.round),
      session.note,
      session.dateShot,
      true,
    ];

    return LocalDb.Insert(sql, params);
  }

  async Delete(shootSessionId) {
    return LocalDb.DeleteRecord(
      LocalDb.SHOOTSESSION_TABLE_NAME,
      shootSessionId,
    );
  }
}
