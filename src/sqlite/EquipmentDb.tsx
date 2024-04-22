import { Equipment } from '../models/Equipment';
import LocalDB from './LocalDb';

/*
Provides interactivity with the equipment table
Must follow a singleton pattern as Typescript does not allow static methods on a interface.
*/
export class EquipmentDb implements DbTable<Equipment> {
  private static instance: EquipmentDb;

  private constructor() {}

  static getInstance(): EquipmentDb {
    if (!this.instance) EquipmentDb.instance = new EquipmentDb();
    return EquipmentDb.instance;
  }

  Validate(): boolean {
    console.log('Validating equipment schema');

    return LocalDB.ExecuteTransaction(
      `CREATE TABLE IF NOT EXISTS ${LocalDB.EQUIPMENT_TABLE_NAME} 
      (id INTEGER PRIMARY KEY AUTOINCREMENT, 
       name TEXT,
       type TEXT,
       image TEXT,
       notes TEXT
       )`,
      undefined,
      _ => {
        console.log(`Validate ${LocalDB.EQUIPMENT_TABLE_NAME}: SUCCESS`);
      },
      (_, error) => {
        LocalDB.ValidationError(error);
        return false;
      },
    );
  }

  Create(equipment: Equipment, callback: (id: number | undefined) => void) {
    console.log('Creating new record', { equipment });

    LocalDB.ExecuteTransaction(
      `INSERT INTO ${LocalDB.EQUIPMENT_TABLE_NAME} (name, type, image, notes) VALUES(?, ?, ?, ?)`,
      [
        equipment.name,
        equipment.type.toString(),
        equipment.image,
        equipment.notes,
      ],
      (_, resultSet) => {
        console.log('Success');
        callback(resultSet.insertId);
      },
      (_, error) => {
        console.warn(error);
        callback(undefined);
        return false;
      },
    );
  }

  Delete(
    id: number,
    callback: (result: { errors: string; recordsDeleted: number }) => void,
  ) {
    console.log('Attempting to delete record with id', { id });

    LocalDB.ExecuteTransaction(
      `DELETE FROM ${LocalDB.EQUIPMENT_TABLE_NAME} WHERE ID = ?`,
      [id],
      (_, resultSet) => {
        callback({
          errors: '',
          recordsDeleted: resultSet.rowsAffected,
        });
      },
      (_, error) => {
        callback({
          errors: error.message,
          recordsDeleted: 0,
        });
        return false;
      },
    );
  }

  GetAll(callback: (result: Equipment[]) => void) {
    throw new Error('Function not implemented.');
  }
}
