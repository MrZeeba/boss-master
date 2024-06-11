import { SQLiteBindParams } from 'expo-sqlite/next';
import { ITable } from '../interfaces/ITable';
import { Equipment } from '../models/domain/Equipment';
import { EquipmentEnt } from '../models/entity/EquipmentEnt';
import LocalDb from './LocalDb';

/*
Provides interactivity with the equipment table
Must follow a singleton pattern as Typescript does not allow static methods on a interface.
*/
export class EquipmentDb implements ITable<EquipmentEnt> {
  private static instance: EquipmentDb;

  private constructor() {}

  static GetInstance(): EquipmentDb {
    if (!this.instance) {
      this.instance = new EquipmentDb();
    }
    return this.instance;
  }

  Restructure(): void {
    throw new Error('Method not implemented.');
  }

  Validate() {
    const sql = `CREATE TABLE IF NOT EXISTS ${LocalDb.EQUIPMENT_TABLE_NAME} 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT,
    type TEXT,
    image TEXT,
    notes TEXT
    )`;

    return LocalDb.Validate(sql, LocalDb.EQUIPMENT_TABLE_NAME);
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
          console.log('Inserted row', result.changes);
          success(result.lastInsertRowId);
        })
        .catch(error => {
          console.warn('Failed to create record', error);
          fail(error);
        });
    });
  }
}
