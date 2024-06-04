import { IDisplayNameObject } from './IDisplayNameObject';

/*
This file contains a list of definitions for round data to bring structure to the data
*/
export interface ISessionType {
  [key: string]: IRound;
}

export interface IRoundType extends IDisplayNameObject {
  rounds: { [key: string]: IRound };
}

export interface IDistanceArrows {
  distance: number;
  arrows: number;
}

export interface IRound extends IDisplayNameObject {
  distanceType: 'metric' | 'imperial';
  faceSize: number;
  zoneScoring: number;
  arrowsPerEnd: number;
  distances?: IDistanceArrows[]; // Optional for rounds without variations
  variations?: {
    displayName: string;
    distances: IDistanceArrows[];
  }[];
}
