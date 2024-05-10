import { IRound } from '../Interfaces/RoundInterfaces';
import { Bow } from './Bow';

export class ShootSession {
  id: number | undefined;
  dateShot: string;
  bow: Bow;
  note: string;
  roundJson: string;
  private _parsedRound?: any; // Private field to store the parsed JSON

  // Getter method for the round property
  get round(): IRound {
    if (!this._parsedRound && this.roundJson) {
      // Lazy parsing of JSON data
      this._parsedRound = JSON.parse(this.roundJson) as IRound;
    }
    return this._parsedRound;
  }

  // Ensure whenever round is set that the json field is updated
  set round(value: IRound) {
    this._parsedRound = value;
    this.roundJson = JSON.stringify(value);
  }
}
