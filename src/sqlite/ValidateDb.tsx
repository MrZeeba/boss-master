import { GetDatabase } from './LocalDb';

export function ValidateDb() {
  console.log('Performing Database Schema Check...');

  const db = GetDatabase();

  db.transaction(tx => {
    const fs = new FileReader();
    tx.executeSql(fs.readAsText('./validate.sql'));
  });
}

function ValidateShootSessions() {
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,type TEXT)`;
}
