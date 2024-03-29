import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import { ShootSession } from '../models/ShootSession';

let _localDB: SQLite.Database;

//Return an open connection
export function GetDatabase() {
  if (Platform.OS === 'web') {
    console.error(
      'This application does not currently support web due to the database infrastructure!',
    );
  }

  if (!_localDB) {
    _localDB = SQLite.openDatabase('boss-master.db');
  }

  return _localDB;
}

export function AddSession(session: ShootSession) {
  const db = GetDatabase();
  const tableName = 'shootsessions';

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ? (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT`,
      [tableName],
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM ?`,
      [tableName],
      (txObj, resultSet) => console.log(resultSet),
      (txObj, error) => {
        console.log(error);
        return false;
      },
    );
  });
}
