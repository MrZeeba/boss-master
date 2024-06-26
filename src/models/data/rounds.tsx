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
        zoneScoring: 10,
        arrowsPerEnd: 6,
        arrowsAtEachDistance: 36,
        variations: [
          { displayName: 'I', distances: [70, 60] },
          { displayName: 'II', distances: [60, 50] },
          { displayName: 'III', distances: [50, 40] },
          { displayName: 'IV', distances: [40, 30] },
          { displayName: 'V', distances: [30, 20] },
        ],
      } as IRound,
      longmetric: {
        displayName: 'Long Metric',
        distanceType: 'metric',
        faceSize: 122,
        zoneScoring: 10,
        arrowsPerEnd: 6,
        arrowsAtEachDistance: 36,
        variations: [
          { displayName: 'I', distances: [90, 70] },
          { displayName: 'II', distances: [70, 60] },
          { displayName: 'III', distances: [50, 40] },
          { displayName: 'IV', distances: [40, 30] },
          { displayName: 'V', distances: [30, 20] },
        ],
      } as IRound,
      york: {
        displayName: 'York',
        distanceType: 'imperial',
        faceSize: 122,
        zoneScoring: 5,
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
        zoneScoring: 10,
        arrowsPerEnd: 6,
        arrowsAtEachDistance: 60,
      } as IRound,
    },
  } as IRoundType,
};

export default roundData;
