import { SQLiteBindParams } from 'expo-sqlite/next';
import { Equipment } from '../models/Equipment';
import LocalDb from './LocalDb';

/*
Provides interactivity with the equipment table
Must follow a singleton pattern as Typescript does not allow static methods on a interface.
*/
export class EquipmentDb implements ITable<Equipment> {
  private static instance: EquipmentDb;

  private constructor() {}

  static GetInstance(): EquipmentDb {
    if (!this.instance) {
      this.instance = new EquipmentDb();
    }
    return this.instance;
  }

  Validate() {
    const sql = `CREATE TABLE IF NOT EXISTS ${LocalDb.EQUIPMENT_TABLE_NAME} 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT,
    type TEXT,
    image TEXT,
    notes TEXT
    )`;

    LocalDb.Validate(sql, LocalDb.EQUIPMENT_TABLE_NAME);
  }

  Create(equipment: Equipment): Promise<number> {
    return new Promise<number>((success, fail) => {
      const db = LocalDb.GetDatabaseInstance();

      const sql: string = `INSERT INTO ${LocalDb.EQUIPMENT_TABLE_NAME} (name, type, image, notes) VALUES (?, ?, ?, ?)`;
      const params: SQLiteBindParams = [
        equipment.name,
        equipment.type.toString(),
        equipment.image,
        equipment.notes,
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
  }
}
