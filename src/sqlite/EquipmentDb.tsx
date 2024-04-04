import { Equipment } from '../models/Equipment';
import { GetDatabase } from './LocalDb';

export const EquipmentDb: DbTable<Equipment> = {
  tableName: 'equipment',

  Validate() {
    console.log('Validating equipment schema');
    const db = GetDatabase();

    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${this.tableName} 
              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
               name TEXT,
               type TEXT
               )`,
        undefined,
        (_, result) => {
          console.log(`Validate ${this.tableName}: SUCCESS`);
        },
      );
    });
  },

  Create(equipment: Equipment, callback: (id: number | undefined) => void) {
    console.log('Creating new record', { equipment });
    const db = GetDatabase();

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ${this.tableName} (name) VALUES(?)`,
        [equipment.name],
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
};
