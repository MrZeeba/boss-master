import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

export default class LocalDB {
  static DATABASE_NAME: string = 'boss-master.db';
  static DATABASE_VERSION: string = '1.0';

  static EQUIPMENT_TABLE_NAME: string = 'equipment';
  static BOW_TABLE_NAME: string = 'bow';

  private static instance: LocalDB | null = null;
  private static db: SQLite.SQLiteDatabase | null = null;

  private constructor() {}

  private static connectToDatabase(): SQLite.SQLiteDatabase {
    if (Platform.OS === 'web') {
      console.error(
        'This application does not currently support web due to the database infrastructure!',
      );
    }

    if (!this.db) {
      this.db = SQLite.openDatabase(
        LocalDB.DATABASE_NAME,
        LocalDB.DATABASE_VERSION,
      );
      console.log('Established a new connection to the database');
    }
    return this.db;
  }

  static GetInstance(): LocalDB {
    if (!this.instance) {
      this.instance = new LocalDB();
    }
    return this.instance;
  }

  static ExecuteTransaction(
    sql: string,
    args: SQLite.SQLStatementArg[] | undefined,
    callback?: SQLite.SQLStatementCallback | undefined,
    errorCallback?: SQLite.SQLStatementErrorCallback | undefined,
  ) {
    const db = this.connectToDatabase();

    db.transaction(
      tx => {
        tx.executeSql(sql, args, callback, errorCallback);
      },
      err => {
        console.error('There was a problem executing the transaction', err);
        return false;
      },
      () => {
        console.log('Transaction executed successfully');
      },
    );

    return true;
  }

  /*
  Deletes an entire table including the structure of it
  */
  static DropTable(
    tableName: string,
    recreate: boolean = true,
    validateFunction: () => void,
    callback: (success: boolean) => void,
  ) {
    const db = this.connectToDatabase();

    db.transaction(tx => {
      tx.executeSql(
        `DROP TABLE IF EXISTS ${tableName}`,
        [],
        () => {
          if (recreate) {
            validateFunction();
            callback(true);
          }
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
  static TruncateTable(
    tableName: string,
    callback: (rowsDeleted: number) => void,
  ) {
    console.log(`Truncating table ${tableName}...`);
    const db = this.connectToDatabase();

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
          console.error(
            `Error truncating table ${tableName}: ${error.message}`,
          );
          return false;
        },
      );
    });
  }

  /*
  Return all of a type
  */
  static GetAll<Type>(tableName: string, callback: (result: Type[]) => void) {
    const db = this.connectToDatabase();

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

  static ValidationError(error: SQLite.SQLError) {
    console.error('There was a problem during database validation', error);
  }
}
