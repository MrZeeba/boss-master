// An interface that matches the db structure of a Bow object, this allows us to map each row to a corresponding domain model.
export interface BowEnt {
  equipment_id: number;
  name: string;
  type: any;
  image: string;
  notes: string;
  classification: any;
  length: number;
  draw_weight: number;
  id: number;
}
