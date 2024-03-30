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
      `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, bow TEXT, note TEXT)`,
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO ${tableName} (note) VALUES(?)`,
      [session.note],
      (txObj, resultSet) => {
        console.log(resultSet);
        return resultSet;
      },
      (txObj, error) => {
        console.log(error);
        return false;
      },
    );
  });
}
