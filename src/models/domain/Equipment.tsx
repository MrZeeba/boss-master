import { IDomain } from '../../Interfaces/IDomain';
import { IDisplayNameObject } from '../../interfaces/IDisplayNameObject';
import { IEntity } from '../../interfaces/IEntity';
import { EquipmentEnt } from '../entity/EquipmentEnt';

export class Equipment implements IDomain {
  id?: number;
  name: string;
  type: IDisplayNameObject;
  image: string;
  notes: string;

  constructor(
    _name: string,
    _type: IDisplayNameObject,
    _image: string,
    _notes: string,
  ) {
    this.name = _name;
    this.type = _type;
    this.image = _image;
    this.notes = _notes;
  }

  toEntity(): IEntity {
    const entity = new EquipmentEnt();
    entity.name = this.name;
    entity.type = this.type;
    entity.image = this.image;
    entity.notes = this.notes;
    //entity.childFK =
    return entity;
  }
}
