import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite/next';
import { Platform } from 'react-native';

export default class LocalDb {
  static DATABASE_NAME: string = 'boss-master.db';
  static DATABASE_VERSION: string = '1.0';
  static DATABASE_PATH: string =
    FileSystem.documentDirectory + `/SQLite/${LocalDb.DATABASE_NAME}`;

  static SHOOTSESSION_TABLE_NAME: string = 'shoot_session';
  static END_TABLE_NAME: string = 'end';
  static EQUIPMENT_TABLE_NAME: string = 'equipment';
  static BOW_TABLE_NAME: string = 'bow';

  private static instance: LocalDb | null = null;
  private static db: SQLite.SQLiteDatabase | null = null;

  private constructor() {}

  static GetInstance(): LocalDb {
    if (!this.instance) {
      this.instance = new LocalDb();
      this.GetDatabaseInstance();
    }
    return this.instance;
  }

  static GetDatabaseInstance(): SQLite.SQLiteDatabase {
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

  static async Validate(sql: string, tableName: string): Promise<boolean> {
    console.log(`DB VALIDATION on table:`, tableName);
    const db = this.GetDatabaseInstance();

    await db.withExclusiveTransactionAsync(async () => {
      db.runAsync(sql)
        .then(fulfilledResult => {
          console.log(`Successfully validated ${tableName}`, fulfilledResult);
          return true;
        })
        .catch(rejectedResult => {
          console.error('Failed validation', sql, rejectedResult);
          return false;
        })
        .finally(() =>
          console.log('Completed Validation on table:', tableName),
        );
    });

    return false;
  }

  /*
  Return all of a type
  */
  static GetAll<Type>(tableName: string): Promise<Type[]> {
    const db = this.GetDatabaseInstance();
    return db.getAllAsync<Type>(`SELECT * FROM ${tableName}`);
  }

  /*
  Return a specific record by type
  */
  static GetById<Type>(
    tableName: string,
    id: number,
    idColumn: string = 'id',
  ): Promise<Type | null> {
    const db = this.GetDatabaseInstance();
    return db.getFirstAsync<Type>(
      `SELECT TOP(1) FROM ${tableName} WHERE ? = ?`,
      [idColumn, id],
    );
  }

  /*
  Performs a query on the database and returns the result promise
  */
  static GetBySQL<Type>(
    sql: string,
    params: SQLite.SQLiteBindParams,
  ): Promise<Type[]> {
    const db = this.GetDatabaseInstance();
    return db.getAllAsync<Type>(sql, params);
  }

  /*
  Performs an insert statement on the database and returns the last inserted ID
  */
  static Insert(
    sql: string,
    params: SQLite.SQLiteBindParams,
  ): Promise<number | undefined> {
    const db = this.GetDatabaseInstance();

    return db
      .runAsync(sql, params)
      .then(result => {
        if (result.changes > 0) {
          return result.lastInsertRowId;
        } else {
          return undefined; // No rows were inserted
        }
      })
      .catch(error => {
        console.error('Error inserting data:', error);
        throw error; // Rethrow the error for handling at a higher level
      });
  }

  /*
  Deletes an entire table including the structure of it
  */
  static DropTable(tableName: string): Promise<boolean> {
    const db = this.GetDatabaseInstance();

    const sql = `DROP TABLE IF EXISTS ${tableName}`;

    return new Promise<boolean>((resolve, reject) => {
      db.withTransactionAsync(async () => {
        await db
          .execAsync(sql)
          .then(() => resolve(true))
          .catch(error => {
            reject(error);
            return false;
          });
      });
    });
  }

  static async DeleteRecord(tableName: string, rowId: number) {
    const db = this.GetDatabaseInstance();

    const sql: string = `DELETE FROM ${tableName} WHERE id = ?`;
    const params: SQLite.SQLiteBindParams = [rowId];

    await db
      .runAsync(sql, params)
      .then(result => {
        console.log(
          `${result.changes} rows deleted from ${tableName} with id ${rowId}`,
        );
      })
      .catch(error => {
        console.log('Failed to delete row', error);
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
    const db = this.GetDatabaseInstance();

    console.log('Closing connection');
    db.closeSync();

    console.log('Deleting database file', this.DATABASE_PATH);
    SQLite.deleteDatabaseSync(this.DATABASE_NAME);

    const dbFileInfo = await FileSystem.getInfoAsync(this.DATABASE_PATH);
    if (!dbFileInfo.exists) {
      console.log('Successfully deleted database file');
      this.db = null;
    }

    console.log('Recreating structure...');
    this.GetDatabaseInstance();
  }
}
