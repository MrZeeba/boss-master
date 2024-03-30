//Mock the database
import * as SQLite from 'expo-sqlite';
import { BowType } from '../Enums/BowType';
import { Bow } from '../models/Bow';
import { ShootSession } from '../models/ShootSession';
import * as LocalDB from './LocalDb';

jest.mock('expo-sqlite', () => ({
  //Fakes and returns an empty object
  openDatabase: jest.fn().mockReturnValue({
    transaction: callback => {
      callback({
        executeSql: jest.fn(),
      });
    },
  }),
}));

describe('Connect to local database', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test case
  });

  it('open a new connection', () => {
    const db = LocalDB.GetDatabase();
    expect(SQLite.openDatabase).toHaveBeenCalledWith('boss-master.db');
    expect(db).not.toBeUndefined();
  });

  it('get an existing connection', () => {
    const db = LocalDB.GetDatabase();
    expect(SQLite.openDatabase).toHaveBeenCalledTimes(0);
    expect(db).not.toBeUndefined();
  });
});

describe('New session', () => {
  it('creates a new session record', () => {
    const date = new Date();
    const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    const session = new ShootSession();
    session.note = 'I am a note for this session';
    session.date = currentDate;
    session.bow = new Bow();
    session.bow.type = BowType.Flatbow;

    const db = LocalDB.GetDatabase();
    LocalDB.AddSession(session, id => {
      expect(id).toBeDefined();
      expect(id).toBeGreaterThan(0);
    });
  });

  it('fails to create a new session record', () => {});
});
