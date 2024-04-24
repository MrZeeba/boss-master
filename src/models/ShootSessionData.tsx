import { Bow } from './Bow';

export class ShootSessionData {
  id: number | undefined;
  dateShot: string;
  bow: Bow;
  note: string;
}
