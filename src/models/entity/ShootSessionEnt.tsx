import { IEntity } from '../../interfaces/IEntity';

import { ShootSession } from '../domain/ShootSession';

export class ShootSessionEnt implements IEntity {
  id?: number;
  dateShot: string;
  bowId: number;
  note: string;
  roundJson: string; //Populated from the database column
  isDraft: boolean;

  toDomain(): ShootSession {
    console.log(`Converting ${this} to a domain object`);
    const session = new ShootSession();
    Object.assign(session, this);
    console.log('Completed conversion of domain object', session);
    return session;
  }
}
