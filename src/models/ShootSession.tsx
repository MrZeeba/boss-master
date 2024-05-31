import { IRound } from '../Interfaces/RoundInterfaces';
import { Bow } from './Bow';

export class ShootSession {
  id: number | undefined;
  dateShot: string;
  bow: Bow;
  note: string;
  roundJson: string; //Populated from the database column
  isDraft: boolean;
  private _parsedRound?: any; // Private field to store the parsed JSON

  // Getter method for the round property. This is required to rebuild the IRound object after it being stored in the database as JSON
  get round(): IRound {
    if (!this._parsedRound && this.roundJson) {
      // Lazy parsing of JSON data
      this._parsedRound = JSON.parse(this.roundJson) as IRound;
    }
    console.log('parsed', this._parsedRound);
    return this._parsedRound;
  }

  // Allows us to set as an IRound object too, which also populates the roundJson for database operation
  set round(value: IRound) {
    this._parsedRound = value;
    this.roundJson = JSON.stringify(value);
  }

  static fromPlainObject(obj: any): ShootSession {
    const session = new ShootSession();
    Object.assign(session, obj);
    return session;
  }
}
