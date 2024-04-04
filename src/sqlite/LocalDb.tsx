import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

let _localDB: SQLite.Database;

/*
Return an open connection
*/
export function GetDatabase(): SQLite.Database {
  if (Platform.OS === 'web') {
    console.error(
      'This application does not currently support web due to the database infrastructure!',
    );
  }

  if (!_localDB) {
    console.log('Established a new connection to the database');
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
Removes the data from a table but retains the structure
*/
export function TruncateTable(
  tableName: string,
  callback: (rowsDeleted: number) => void,
) {
  const db = GetDatabase();
  console.log(`Truncating table ${tableName}...`);

  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM ${tableName}`,
      [],
      (_, result) => {
        console.log('Truncate result', result);
        callback(result.rowsAffected);

        //Resequence table
        tx.executeSql(`UPDATE SQLITE_SEQUENCE SET SEQ = 0 WHERE NAME = ?`, [
          tableName,
        ]);
      },
      (_, error: SQLite.SQLError) => {
        console.error(`Error truncating table ${tableName}: ${error.message}`);
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
