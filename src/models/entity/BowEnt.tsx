// An interface that matches the db structure of a Bow object, this allows us to map each row to a corresponding domain model.
export interface BowEnt {
  equipment_id: number;
  name: string;
  type: any; // Adjust type based on your actual data structure
  image: string;
  notes: string;
  classification: any; // Adjust type based on your actual data structure
  length: number;
  draw_weight: number;
  id: number;
}
