import { Bow } from '../models/Bow';

export class BowDb implements DbTable<Bow>, IDbChildTable<Bow> {
  tableName: string = 'bow';

  Validate() {
    console.log('test!', this.tableName);
    throw new Error('Function not implemented.');
  }

  Create(
    parentId: number,
    item: Bow,
    callback: (id: number | undefined) => void,
  ) {
    throw new Error('Function not implemented.');
  }

  GetAll(callback: (result: Bow[]) => void) {
    throw new Error('Function not implemented.');
  }

  Delete(
    id: number,
    callback: (result: { errors: string; recordsDeleted: number }) => void,
  ) {
    throw new Error('Function not implemented.');
  }

  Eggs() {
    throw new Error('Eggs not implemented.');
  }
}
