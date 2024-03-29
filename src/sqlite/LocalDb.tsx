import * as SQLite from 'expo-sqlite';
import { ShootSession } from '../models/ShootSession';

let _localDB: SQLite.Database;

//Return an open connection
export function GetDatabase() {
  if (!_localDB) {
    _localDB = SQLite.openDatabase('boss-master.db');
  }
  return _localDB;
}

export function AddSession(session: ShootSession) {
  const db = GetDatabase();
  db.transaction(tx => {
    tx.executeSql('SELECT COUNT(*) FROM INFORMATION_SCHEMA');
  });
}
