import { Equipment } from '../models/Equipment';
import { GetDatabase } from './LocalDb';

export const tableName = 'equipment';

export function Validate() {
  console.log('Validating equipment schema');
  const db = GetDatabase();

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tableName} 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
             name TEXT,
             type TEXT
             )`,
      undefined,
      (_, result) => {
        console.log(`Validate ${tableName}: SUCCESS`);
      },
    );
  });
}

export function Create(
  equipment: Equipment,
  callback: (id: number | undefined) => void,
) {
  console.log('Creating new record', { equipment });
  const db = GetDatabase();

  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO ${tableName} (name) VALUES(?)`,
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
}
