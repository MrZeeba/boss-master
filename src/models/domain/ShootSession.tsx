import { IRound } from '../../interfaces/RoundInterfaces';
import { ShootSessionEnt } from '../entity/ShootSessionEnt';
import { Bow } from './Bow';

export class ShootSession {
  id: number | undefined;
  dateShot: string;
  bow: Bow;
  note: string;
  round: IRound;
  isDraft: boolean;

  constructor(
    _id: number | undefined = undefined,
    _dateShot: string,
    _bow: Bow,
    _note: string,
    _round: IRound,
    _isDraft: boolean = false,
  ) {
    this.id = _id;
    this.dateShot = _dateShot;
    this.bow = _bow;
    this.note = _note;
    this.round = _round;
    this.isDraft = _isDraft;
  }

  static FromRow(row: ShootSessionEnt, bow: Bow): ShootSession {
    return new ShootSession(
      row.id,
      row.date_shot,
      bow,
      row.note,
      JSON.parse(row.round_json),
      row.is_draft,
    );
  }
}
