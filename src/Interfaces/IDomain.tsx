import { IEntity } from './IEntity';

export interface IDomain {
  toEntity(): IEntity;
}
