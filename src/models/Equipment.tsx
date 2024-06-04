import { IDisplayNameObject } from '../Interfaces/IDisplayNameObject';

export class Equipment {
  id: number;
  name: string;
  type: IDisplayNameObject;
  image: string;
  notes: string;
  childFK: any;
}
