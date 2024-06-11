import IDisplayNameObject from '../../interfaces/IDisplayNameObject';
import { equipmentTypes } from '../data/equipmentTypes';
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
}
