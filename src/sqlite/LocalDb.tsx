import * as SQLite from 'expo-sqlite';

const _localDB = undefined;

//Return an open connection
export const localDB = function () {
  return _localDB ?? SQLite.openDatabase('boss-master.db');
};
