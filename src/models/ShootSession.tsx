import { Bow } from './Bow';

export class ShootSession {
  id: number | undefined;
  dateShot: string;
  bow: Bow;
  note: string;
  round: string; //switch to type when we have it
}
