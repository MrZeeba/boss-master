import { IDisplayNameObject } from '../../interfaces/IDisplayNameObject';
import { IDomain } from '../../interfaces/IDomain';
import { BowEnt } from '../entity/BowEnt';
import { Equipment } from './Equipment';

export class Bow extends Equipment implements IDomain {
  bowId?: number;
  equipmentId: number;
  classification: IDisplayNameObject;
  length: number;
  drawWeight: number;

  super(
    _classification: IDisplayNameObject,
    _length: number,
    _drawWeight: number,
  ) {
    classification = _classification;
  }

  toEntity(): BowEnt {
    const entity = new BowEnt();
    entity.equipmentId = this.equipmentId;
    entity.classification = this.classification;
    entity.length = this.length;
    entity.drawWeight = this.drawWeight;
    return entity;
  }
}
