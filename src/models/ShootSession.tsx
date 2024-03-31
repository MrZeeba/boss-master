import { Bow } from './Bow';

export class ShootSession {
  id: number | undefined;
  date: string;
  bow: Bow;
  note: string;
}
