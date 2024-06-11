import IDisplayNameObject from '../../interfaces/IDisplayNameObject';
import { Equipment } from './Equipment';

export class Bow extends Equipment {
  bowId: number;
  equipmentId: number;
  classification: IDisplayNameObject;
  length: number;
  drawWeight: number;

  constructor(
    _equipmentId: number,
    _name: string,
    _type: IDisplayNameObject,
    _image: string,
    _notes: string,
    _classification: IDisplayNameObject,
    _length: number,
    _drawWeight: number,
  ) {
    super(_equipmentId, _name, _type, _image, _notes);
    this.classification = _classification;
    this.length = _length;
    this.drawWeight = _drawWeight;
  }
}
