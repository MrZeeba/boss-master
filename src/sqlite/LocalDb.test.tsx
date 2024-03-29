//Mock the database
import * as SQLite from 'expo-sqlite';
import { localDB } from './LocalDb';

jest.mock('expo-sqlite', () => ({
  openDatabase: jest.fn(),
}));

describe('Connect to local database', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test case
  });

  it('open a new connection', () => {
    localDB();
    expect(SQLite.openDatabase).toHaveBeenCalledWith('boss-master.db');
  });

  it('get an existing connection', () => {
    localDB();
    localDB();
    expect(SQLite.openDatabase).toHaveBeenCalledTimes(1);
  });
});
