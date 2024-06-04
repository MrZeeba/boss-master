import { ZoneScoringType } from '../../Enums/ZoneScoringType';
import {
  IRound,
  IRoundType,
  ISessionType,
} from '../../Interfaces/RoundInterfaces';

export const roundData: ISessionType = {
  practice: {
    displayName: 'Practice',
  } as IRoundType,
  outdoor: {
    displayName: 'Outdoor',
    rounds: {
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
      } as IRound,
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
      } as IRound,
      york: {
        displayName: 'York',
        distanceType: 'imperial',
        faceSize: 122,
        zoneScoring: ZoneScoringType.FivePoint,
        arrowsPerEnd: 6,
        distances: [
          {
            distance: 100,
            arrows: 72,
          },
          {
            distance: 80,
            arrows: 48,
          },
          {
            distance: 60,
            arrows: 24,
          },
        ],
      } as IRound,
    },
  } as IRoundType,
  indoor: {
    displayName: 'Indoor',
    rounds: {
      portsmouth: {
        displayName: 'Portsmouth',
        distanceType: 'imperial',
        faceSize: 60,
        zoneScoring: ZoneScoringType.TenPoint,
        arrowsPerEnd: 6,
        arrowsAtEachDistance: 60,
      } as IRound,
    },
  } as IRoundType,
};

export default roundData;
