import { SQLiteBindParams } from 'expo-sqlite/next';
import { ITable } from '../interfaces/ITable';
import { Equipment } from '../models/domain/Equipment';
import LocalDb from './LocalDb';

/*
Provides interactivity with the equipment table
Must follow a singleton pattern as Typescript does not allow static methods on a interface.
*/
export class EquipmentDb implements ITable<Equipment> {
  private static instance: EquipmentDb;

  static GetInstance(): EquipmentDb {
    if (!this.instance) {
      this.instance = new EquipmentDb();
    }
    return this.instance;
  }

  Validate(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  Restructure(): void {
    throw new Error('Method not implemented.');
  }

  Fetch(): Promise<Equipment[]> {
    throw new Error('Method not implemented.');
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
