import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

let _localDB: SQLite.Database;

/*
Return an open connection
*/
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

/*
Deletes an entire table including the structure of it
*/
export function DropTable(
  tableName: string,
  callback: (success: boolean) => void,
) {
  const db = GetDatabase();

  db.transaction(tx => {
    tx.executeSql(
      `DROP TABLE IF EXISTS ${tableName}`,
      [],
      () => {
        callback(true);
      },
      (_, error: SQLite.SQLError) => {
        console.error(`Error dropping table ${tableName}: ${error.message}`);
        callback(false);
        return false;
      },
    );
  });
}

/*
Return all of a type
*/
export function GetAll<Type>(
  tableName: string,
  callback: (result: Type[]) => void,
) {
  const db = GetDatabase();

  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM ${tableName}`,
      [],
      (_, resultSet) => {
        callback(resultSet.rows._array);
      },
      (_, error) => {
        console.log(error);
        return false;
      },
    );
  });
}
