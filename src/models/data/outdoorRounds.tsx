import { ZoneScoringType } from '../../enums/ZoneScoringType';
import { ISessionType } from '../../interfaces/RoundInterfaces';

export const outdoorRounds: ISessionType = {
  shortmetric: {
    displayName: 'Short Metric',
    distanceType: 'metric',
    faceSize: 80,
    zoneScoring: ZoneScoringType.TenPoint,
    arrowsPerEnd: 6,
    variations: [
      {
        displayName: 'I',
        distances: [
          { distance: 50, arrows: 36 },
          { distance: 30, arrows: 36 },
        ],
      },
      {
        displayName: 'II',
        distances: [
          { distance: 40, arrows: 36 },
          { distance: 30, arrows: 36 },
        ],
      },
      {
        displayName: 'III',
        distances: [
          { distance: 30, arrows: 36 },
          { distance: 20, arrows: 36 },
        ],
      },
      {
        displayName: 'IV',
        distances: [
          { distance: 20, arrows: 36 },
          { distance: 10, arrows: 36 },
        ],
      },
      {
        displayName: 'V',
        distances: [
          { distance: 15, arrows: 36 },
          { distance: 10, arrows: 36 },
        ],
      },
    ],
  },
  longmetric: {
    displayName: 'Long Metric',
    distanceType: 'metric',
    faceSize: 122,
    zoneScoring: ZoneScoringType.TenPoint,
    arrowsPerEnd: 6,
    variations: [
      {
        displayName: 'I',
        distances: [
          { distance: 70, arrows: 36 },
          { distance: 60, arrows: 36 },
        ],
      },
      {
        displayName: 'II',
        distances: [
          { distance: 60, arrows: 36 },
          { distance: 50, arrows: 36 },
        ],
      },
      {
        displayName: 'III',
        distances: [
          { distance: 50, arrows: 36 },
          { distance: 40, arrows: 36 },
        ],
      },
      {
        displayName: 'IV',
        distances: [
          { distance: 40, arrows: 36 },
          { distance: 30, arrows: 36 },
        ],
      },
      {
        displayName: 'V',
        distances: [
          { distance: 30, arrows: 36 },
          { distance: 20, arrows: 36 },
        ],
      },
    ],
  },
};
