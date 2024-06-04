import { IDisplayNameObject } from '../Interfaces/IDisplayNameObject';
import { Equipment } from './Equipment';

export class Bow extends Equipment {
  bowId: number;
  equipmentId: number;
  classification: IDisplayNameObject;
  length: number;
  drawWeight: number;
}
