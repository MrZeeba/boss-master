import { IDomain } from '../../Interfaces/IDomain';
import { IRound } from '../../Interfaces/RoundInterfaces';
import { Bow } from '../Bow';
import { End } from '../End';
import { ShootSessionEnt as ShootSessionEntity } from '../entity/ShootSessionEnt';

export class ShootSession implements IDomain {
  id?: number;
  dateShot: string;
  bow: Bow;
  note: string;
  isDraft: boolean;
  ends: End[];
  round: IRound;

  toEntity(): ShootSessionEntity {
    const entity = new ShootSessionEntity();
    entity.dateShot = this.dateShot;
    entity.bowId = this.bow.bowId;
    entity.note = this.note;
    entity.isDraft = this.isDraft;
    entity.roundJson = JSON.stringify(this.round);
    return entity;
  }

  // Adds a score to the current end
  AddEndScore(score: number) {
    /* if (this.ends === undefined) {
      this.ends = new End[this.round.]
    }*/
  }
}
