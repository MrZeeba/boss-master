import { IDisplayNameObject } from '../../interfaces/IDisplayNameObject';
import { IEntity } from '../../interfaces/IEntity';
import { Equipment } from '../domain/Equipment';

export class EquipmentEnt implements IEntity {
  id: number;
  name: string;
  type: IDisplayNameObject;
  image: string;
  notes: string;
  childFK: any;

  toDomain(): Equipment {
    const entity = new Equipment();
    entity.id = this.id;
    entity.name = this.name;
    entity.type = this.type;
    entity.image = this.image;
    entity.notes = this.notes;
    return entity;
  }
}
