import { SQLiteBindParams } from 'expo-sqlite/next';
import { ITable } from '../interfaces/ITable';
import { Bow } from '../models/domain/Bow';
import { BowEnt } from '../models/entity/BowEnt';
import { EquipmentDb } from './EquipmentDb';
import LocalDb, { default as LocalDB } from './LocalDb';

/*
  Provides interactivity with the equipment table
  Must follow a singleton pattern as Typescript does not allow static methods on a interface.
  */
export class BowDb implements ITable<Bow> {
  private static instance: BowDb;

  static GetInstance(): BowDb {
    if (!this.instance) this.instance = new BowDb();
    return this.instance;
  }

  Validate() {
    const sql = `CREATE TABLE IF NOT EXISTS ${LocalDB.BOW_TABLE_NAME} 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
      equipment_id INTEGER NOT NULL,
      classification TEXT,
      draw_weight TEXT,
      FOREIGN KEY (equipment_id)
        REFERENCES equipment(id)
    )`;

    return LocalDb.Validate(sql, LocalDB.BOW_TABLE_NAME);
  }

  Restructure(): void {
    throw new Error('Method not implemented.');
  }

  Fetch(): Promise<Bow[]> {
    console.log('Fetching bow records');

    return new Promise<Bow[]>((success, fail) => {
      const db = LocalDb.GetDatabaseInstance();

      const sql = `SELECT b.*, e.* FROM ${LocalDB.BOW_TABLE_NAME} b JOIN ${LocalDB.EQUIPMENT_TABLE_NAME} e on b.equipment_id == e.id`;

      db.getAllAsync<BowEnt>(sql)
        .then(bows => {
          success(bows.map(row => Bow.FromRow(row)));
        })
        .catch(err => fail(err));
    });
  }

  GetById(bow_id: number) {
    throw new Error('Method not implemented.');
  }

  // Returns an updated bow object containing the id
  Create(bow: Bow): Promise<number> {
    console.log('Attempting to create bow', bow);

    return new Promise<number>((success, fail) => {
      const db = LocalDb.GetDatabaseInstance();

      const equipDb = EquipmentDb.GetInstance();

      equipDb.Create(bow).then(equipId => {
        const sql: string = `INSERT INTO ${LocalDB.BOW_TABLE_NAME} (equipment_id, classification, draw_weight) VALUES(?,?,?)`;
        const params: SQLiteBindParams = [
          equipId,
          bow.classification.toString(),
          bow.drawWeight,
        ];

        db.runAsync(sql, params)
          .then(result => {
            console.log('Inserted row', result.changes);
            success(result.lastInsertRowId);
          })
          .catch(error => {
            console.warn('Failed to create record', error);
            fail(error);
          });
      });
    });
  }
}
