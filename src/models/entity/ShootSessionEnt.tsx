// An interface that matches the db structure of a Shoot Session object, this allows us to map each row to a corresponding domain model.
export interface ShootSessionEnt {
  id: number;
  note: any;
  round_json: string;
  date_shot: any;
  bow_id: number;
  is_draft: boolean;
}
