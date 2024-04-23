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

  Create(equipment: Equipment, callback: (id: number) => void) {
    console.log('Creating new record', { equipment });

    LocalDb.ExecuteTransaction(
      `INSERT INTO ${LocalDb.EQUIPMENT_TABLE_NAME} (name, type, image, notes) VALUES(?, ?, ?, ?)`,
      [
        equipment.name,
        equipment.type.toString(),
        equipment.image,
        equipment.notes,
      ],
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

  Delete(
    id: number,
    callback: (result: { errors: string; recordsDeleted: number }) => void,
  ) {
    console.log('Attempting to delete record with id', { id });

    LocalDb.ExecuteTransaction(
      `DELETE FROM ${LocalDb.EQUIPMENT_TABLE_NAME} WHERE ID = ?`,
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
}
