/*
This file contains a list of definitions for round data to bring structure to the data
*/
interface ISessionType {
  types: {
    practice: IRoundType;
    outdoor: IRoundType;
    indoor: IRoundType;
  };
}

interface IRoundType {
  displayName: string;
  rounds: { [key: string]: IRound };
}

interface IRound {
  displayName: string;
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
