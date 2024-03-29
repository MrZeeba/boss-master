import * as SQLite from 'expo-sqlite';

let _localDB;

//Return an open connection
export const localDB = function () {
  if (!_localDB) {
    _localDB = SQLite.openDatabase('boss-master.db');
  }
  return _localDB;
};

export function AddSession() {}
