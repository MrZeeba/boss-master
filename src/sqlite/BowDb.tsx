import { Bow } from '../models/Bow';

export const BowDB: DbTable<Bow> = {
  tableName: 'bow',

  Validate() {
    throw new Error('Function not implemented.');
  },

  Create(item: Bow, callback: (id: number | undefined) => void) {
    throw new Error('Function not implemented.');
  },

  GetAll(callback: (result: Bow[]) => void) {
    throw new Error('Function not implemented.');
  },

  Delete(
    id: number,
    callback: (result: { errors: string; recordsDeleted: number }) => void,
  ) {
    throw new Error('Function not implemented.');
  },
};
