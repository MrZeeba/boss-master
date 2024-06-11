import { IDomain } from '../../Interfaces/IDomain';
import { IDisplayNameObject } from '../../interfaces/IDisplayNameObject';
import { equipmentTypes } from '../data/equipmentTypes';
import { BowEnt } from '../entity/BowEnt';
import { Equipment } from './Equipment';

export class Bow extends Equipment implements IDomain {
  bowId?: number;
  equipmentId: number;
  classification: IDisplayNameObject;
  length: number;
  drawWeight: number;

  constructor(
    _name: string,
    _image: string,
    _notes: string,
    _classification: IDisplayNameObject,
    _length: number,
    _drawWeight: number,
  ) {
    super(_name, equipmentTypes.bow, _image, _notes);
    this.classification = _classification;
    this.length = _length;
    this.drawWeight = _drawWeight;
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
