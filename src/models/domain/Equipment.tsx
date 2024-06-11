import IDisplayNameObject from '../../interfaces/IDisplayNameObject';

export class Equipment {
  id: number;
  name: string;
  type: IDisplayNameObject;
  image: string;
  notes: string;

  constructor(
    _id: number,
    _name: string,
    _type: IDisplayNameObject,
    _image: string,
    _notes: string,
  ) {
    this.id = _id;
    this.name = _name;
    this.type = _type;
    this.image = _image;
    this.notes = _notes;
  }
}
