import { IDisplayNameObject } from '../../Interfaces/IDisplayNameObject';
import { IEntity } from '../../Interfaces/IEntity';
import { Bow } from '../domain/Bow';

export class BowEnt implements IEntity {
  bowId: number;
  equipmentId: number;
  classification: IDisplayNameObject;
  length: number;
  drawWeight: number;

  toDomain(): Bow {
    console.log(`Converting ${this} to a domain model`);
    const bow = new Bow();
    Object.assign(bow, this);
    console.log('Completed conversion of domain object', bow);
    return bow;
  }
}
