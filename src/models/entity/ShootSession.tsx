import { IEntity } from '../../Interfaces/IEntity';

import { ShootSession as ShootSessionDomain } from '../domain/ShootSession';

export class ShootSession implements IEntity {
  id?: number;
  dateShot: string;
  bowId: number;
  note: string;
  roundJson: string; //Populated from the database column
  isDraft: boolean;

  toDomain(): ShootSessionDomain {
    console.log(`Converting ${this} to a domain object`);
    const session = new ShootSessionDomain();
    Object.assign(session, this);
    console.log('Completed conversion of domain object', session);
    return session;
  }
}
