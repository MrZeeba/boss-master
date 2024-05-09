import { IDisplayNameObject } from './IDisplayNameObject';

/*
This file contains a list of definitions for round data to bring structure to the data
*/
export interface ISessionType {
  [key: string]: IRoundType;
}

export interface IRoundType extends IDisplayNameObject {
  rounds: { [key: string]: IRound };
}

export interface IRound extends IDisplayNameObject {
  distanceType: 'metric' | 'imperial';
  faceSize: number;
  zoneScoring: number;
  arrowsPerEnd: number;
  arrowsAtEachDistance?: number; // Optional for rounds with variations
  distances?: { distance: number; arrows: number }[]; // Optional for rounds without variations
  variations?: {
    displayName: string;
    distances: number[];
  }[];
}
