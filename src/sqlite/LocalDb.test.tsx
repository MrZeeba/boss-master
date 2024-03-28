//Mock the database
import * as SQLite from 'expo-sqlite';
import { localDB } from './localdb';

jest.mock('expo-sqlite', () => ({
  openDatabase: jest.fn(),
}));

// Mock the module
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
    // Mock an existing connection
    const mockConnection = { mock: 'connection' };
    SQLite.openDatabase.mockImplementation(mockConnection); // Mock the return value of openDatabase

    // Call localDB function
    const connection = localDB();

    // Assert that it returns the existing connection
    expect(connection).toEqual(mockConnection);
  });
});
