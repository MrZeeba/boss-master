import IDisplayNameObject from '../../interfaces/IDisplayNameObject';

export class Equipment {
  id?: number;
  name: string;
  type: IDisplayNameObject;
  image: string;
  note: string;

  constructor(
    _id: number | undefined,
    _name: string,
    _type: IDisplayNameObject,
    _image: string,
    _note: string,
  ) {
    this.id = _id;
    this.name = _name;
    this.type = _type;
    this.image = _image;
    this.note = _note;
  }
}
