//Mock the database
import * as SQLite from 'expo-sqlite';
import { localDB } from './LocalDb';

jest.mock('expo-sqlite', () => ({
  //Fakes and returns an empty object
  openDatabase: jest.fn().mockReturnValue({}),
}));

describe('Connect to local database', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test case
  });

  it('open a new connection', () => {
    const db = localDB();
    expect(SQLite.openDatabase).toHaveBeenCalledWith('boss-master.db');
    expect(db).not.toBeUndefined();
  });

  it('get an existing connection', () => {
    localDB();
    expect(SQLite.openDatabase).toHaveBeenCalledTimes(0);
  });
});
