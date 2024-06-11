import { SQLiteBindParams } from 'expo-sqlite/next';
import { IChildTable } from '../interfaces/IChildTable';
import { Bow } from '../models/domain/Bow';
import { Equipment } from '../models/domain/Equipment';
import { BowEnt } from '../models/entity/BowEnt';
import { EquipmentDb } from './EquipmentDb';
import LocalDb, { default as LocalDB } from './LocalDb';

/*
  Provides interactivity with the equipment table
  Must follow a singleton pattern as Typescript does not allow static methods on a interface.
  */
export class BowDb implements IChildTable<BowEnt> {
  private static instance: BowDb;

  private constructor() {}

  Restructure(): void {
    throw new Error('Method not implemented.');
  }

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

  Fetch(): Promise<Bow[]> {
    console.log('Fetching bow records');

    return new Promise<Bow[]>((success, fail) => {
      const db = LocalDb.GetDatabaseInstance();

      const sql = `SELECT b.*, e.* FROM ${LocalDB.BOW_TABLE_NAME} b JOIN ${LocalDB.EQUIPMENT_TABLE_NAME} e on b.equipment_id == e.id`;

      const bows = db
        .getAllAsync<BowEnt>(sql)
        .then(bows => {
          success(
            bows.map(
              row =>
                new Bow(
                  row.equipment_id,
                  row.name,
                  row.type,
                  row.image,
                  row.notes,
                  row.classification,
                  row.length,
                  row.draw_weight,
                ),
            ),
          );
        })
        .catch(err =>
          console.warn('There was an error during SQL execution', err),
        );
    });
  }

  // Returns the inserted record id from the bow table
  Create(bow: Bow): Promise<number> {
    console.log('Attempting to create bow', bow);

    return new Promise<number>((success, fail) => {
      const db = LocalDb.GetDatabaseInstance();

      const equipDb = EquipmentDb.GetInstance();
      const equipmentSuper = Object.getPrototypeOf(bow) as Equipment;
      console.log('equipmentSuper', equipmentSuper);

      equipDb.Create(equipmentSuper).then(equipId => {
        const bowEnt = bow.toEntity();

        const sql: string = `INSERT INTO ${LocalDB.BOW_TABLE_NAME} (equipment_id, classification, draw_weight) VALUES(?,?,?)`;
        const params: SQLiteBindParams = [
          equipId,
          bowEnt.classification,
          bowEnt.drawWeight,
        ];

        db.runAsync(sql, params)
          .then(result => {
            console.log('Changes made', result.changes);
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
