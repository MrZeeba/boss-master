/* 
Responsible for storing data related to a specific end 
*/

import LocalDb from './LocalDb';

export class EndDb implements IChildTable<End> {
  private static instance: EndDb;

  private constructor() {}

  static GetInstance(): EndDb {
    if (!this.instance) this.instance = new EndDb();
    return this.instance;
  }

  Validate() {
    const sql: string = `
        CREATE TABLE IF NOT EXISTS ${LocalDb.END_TABLE_NAME} (
            "id"	INTEGER,
            "shootSessionId"	INTEGER,
            "image"	INTEGER,
            "arrow1"	INTEGER,
            "arrow2"	INTEGER,
            "arrow3"	INTEGER,
            "arrow4"	INTEGER,
            "arrow5"	INTEGER,
            "arrow6"	INTEGER,
            FOREIGN KEY("shoot_session_id") REFERENCES "shoot_session"("id") ON DELETE CASCADE,
            PRIMARY KEY("id" AUTOINCREMENT)
        );
    `;

    LocalDb.Validate(sql, LocalDb.END_TABLE_NAME);
  }

  Create(End: End, parentId: number): Promise<number> {
    console.error('Oops, not yet implemented!');
  }
}
