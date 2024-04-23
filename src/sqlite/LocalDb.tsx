import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite/next';
import { Platform } from 'react-native';

export default class LocalDb {
  static DATABASE_NAME: string = 'boss-master.db';
  static DATABASE_VERSION: string = '1.0';
  static DATABASE_PATH: string =
    FileSystem.documentDirectory + `/SQLite/${LocalDb.DATABASE_NAME}`;

  static SHOOTSESSIONS_TABLE_NAME: string = 'shoot_sessions';
  static EQUIPMENT_TABLE_NAME: string = 'equipment';
  static BOW_TABLE_NAME: string = 'bow';

  private static instance: LocalDb | null = null;
  public static db: SQLite.SQLiteDatabase | null = null;

  private constructor() {}

  private static connectToDatabase(): SQLite.SQLiteDatabase {
    if (Platform.OS === 'web') {
      console.error(
        'This application does not currently support web due to the database infrastructure!',
      );
    }

    if (!this.db) {
      console.log('Database location', this.DATABASE_PATH);

      this.db = SQLite.openDatabaseSync(LocalDb.DATABASE_NAME);
      console.log('Established a new connection to the database');
    }
    return this.db;
  }

  static GetInstance(): LocalDb {
    if (!this.instance) {
      this.instance = new LocalDb();
      this.connectToDatabase();
    }
    return this.instance;
  }

  /*
  Return all of a type
  */
  static GetAll<Type>(tableName: string, callback: (result: Type[]) => void) {
    this.db
      ?.getAllAsync<Type>(`SELECT * FROM ${tableName}`)
      .then(result => console.log('Promise completed with result', result))
      .catch(error => console.log('Uh oh', error))
      .finally(() => console.log("I'm doing this anyway"));
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

  static ValidationError(typeName: string, error: SQLite.SQLError) {
    console.error(
      `There was a problem during database validation of type ${typeName}`,
      error,
    );
  }

  static async Restructure() {
    console.log('Closing connection');
    this.db?.closeSync();
    SQLite.deleteDatabaseSync(this.DATABASE_NAME);
    //Recreate
    this.connectToDatabase();
  }
}
