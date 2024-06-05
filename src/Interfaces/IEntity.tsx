import { IDomain } from './IDomain';

export interface IEntity {
  id?: number;
  toDomain(): IDomain;
}
