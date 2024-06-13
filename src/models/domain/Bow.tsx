import IDisplayNameObject from '../../interfaces/IDisplayNameObject';
import { equipmentTypes } from '../data/equipmentTypes';
import { BowEnt } from '../entity/BowEnt';
import { Equipment } from './Equipment';

export class Bow extends Equipment {
  bowId?: number;
  equipmentId: number;
  classification: IDisplayNameObject;
  length: number;
  drawWeight: number;

  constructor(
    _equipmentId: number | undefined,
    _name: string,
    _image: string,
    _notes: string,
    _bowId: number | undefined,
    _classification: IDisplayNameObject,
    _length: number,
    _drawWeight: number,
  ) {
    super(_equipmentId, _name, equipmentTypes.bow, _image, _notes);
    this.classification = _classification;
    this.length = _length;
    this.drawWeight = _drawWeight;
  }

  static FromRow(r: BowEnt): Bow {
    const bow = new Bow(
      r.equipment_id,
      r.name,
      r.image,
      r.notes,
      r.id,
      r.classification,
      r.length,
      r.draw_weight,
    );

    return bow;
  }
}
