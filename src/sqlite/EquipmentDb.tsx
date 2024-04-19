import { Equipment } from '../models/Equipment';
import { GetAll, GetDatabase } from './LocalDb';

export const EquipmentDb: DbTable<Equipment> = {
  tableName: 'equipment',

  Validate(): boolean {
    console.log('Validating equipment schema');
    const db = GetDatabase();

    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${this.tableName} 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
             name TEXT,
             type TEXT,
             image TEXT,
             notes TEXT
             )`,
        undefined,
        (_, result) => {
          console.log(`Validate ${this.tableName}: SUCCESS`);
          return true;
        },
      );
    });
    return false;
  },

  Create(equipment: Equipment, callback: (id: number | undefined) => void) {
    console.log('Creating new record', { equipment });
    const db = GetDatabase();

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ${this.tableName} (name, type, image, notes) VALUES(?, ?, ?, ?)`,
        [equipment.name, equipment.type, equipment.image, equipment.notes],
        (_, resultSet) => {
          callback(resultSet.insertId);
        },
        (_, error) => {
          console.warn(error);
          callback(undefined);
          return false;
        },
      );
    });
  },

  Delete(
    id: number,
    callback: (result: { errors: string; recordsDeleted: number }) => void,
  ) {
    console.log('Attempting to delete record with id', { id });
    const db = GetDatabase();

    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM ${this.tableName} WHERE ID = ?`,
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
    });
  },

  GetAll(callback: (result: Equipment[]) => void) {
    GetAll<Equipment>(this.tableName, equipment => {
      //Convert necessary enums
      equipment.map();
      callback(result);
    });
  },
};
