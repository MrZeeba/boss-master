import { Bow } from '../models/Bow';

export const BowDB: DbTable<Bow> = {
  tableName: '',

  Validate() {
    throw new Error('Function not implemented.');
  },

  Create(item: Bow, callback: (id: number | undefined) => void) {
    throw new Error('Function not implemented.');
  },
};
