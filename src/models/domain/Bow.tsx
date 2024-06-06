import { IDisplayNameObject } from '../../Interfaces/IDisplayNameObject';
import { IDomain } from '../../Interfaces/IDomain';
import { Equipment } from '../Equipment';
import { BowEnt } from '../entity/BowEnt';

export class Bow extends Equipment implements IDomain {
  bowId?: number;
  equipmentId: number;
  classification: IDisplayNameObject;
  length: number;
  drawWeight: number;

  toEntity(): BowEnt {
    const entity = new BowEnt();
    entity.equipmentId = this.equipmentId;
    entity.classification = this.classification;
    entity.length = this.length;
    entity.drawWeight = this.drawWeight;
    return entity;
  }
}
