import { Bow } from '../models/Bow';
import LocalDb, { default as LocalDB } from './LocalDb';

/*
  Provides interactivity with the equipment table
  Must follow a singleton pattern as Typescript does not allow static methods on a interface.
  */
export class BowDb implements IChildTable<Bow> {
  private static instance: BowDb;

  private constructor() {}

  static GetInstance(): BowDb {
    if (!this.instance) this.instance = new BowDb();
    return this.instance;
  }

  Validate() {
    const sql = `CREATE TABLE IF NOT EXISTS ${LocalDB.BOW_TABLE_NAME} 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    draw_weight TEXT,
    equipment_id INTEGER NOT NULL,
    FOREIGN KEY (equipment_id)
      REFERENCES equipment(id)
    )`;

    LocalDb.Validate(sql, LocalDB.BOW_TABLE_NAME);
  }

  Create(
    item: Bow,
    parentId: number,
    callback: (id: number | undefined) => void,
  ) {
    LocalDB.ExecuteTransaction(
      `INSERT INTO ${LocalDB.BOW_TABLE_NAME} (equipment_id, draw_weight) VALUES(?, ?)`,
      [parentId, item.drawWeight],
      (_, resultSet) => {
        console.log('Success');
        if (resultSet.insertId) callback(resultSet.insertId);
      },
      (_, error) => {
        console.warn(error);
        return false;
      },
    );
  }

  GetAll(callback: (result: Bow[]) => void) {
    throw new Error('Function not implemented.');
  }

  Delete(
    id: number,
    callback: (result: { errors: string; recordsDeleted: number }) => void,
  ) {
    throw new Error('Function not implemented.');
  }
}
