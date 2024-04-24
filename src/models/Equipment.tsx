import { DropdownObject } from './DropdownObject';

export class Equipment {
  id: number;
  name: string;
  type: DropdownObject;
  image: string;
  notes: string;
  childFK: any;
}
