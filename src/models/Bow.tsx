import { DropdownObject } from './DropdownObject';
import { Equipment } from './Equipment';

export class Bow extends Equipment {
  bowId: number;
  equipmentId: number;
  classification: DropdownObject;
  length: number;
  drawWeight: number;
}
