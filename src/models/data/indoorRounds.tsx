import { ZoneScoringType } from '../../enums/ZoneScoringType';
import { ISessionType } from '../../interfaces/RoundInterfaces';

export const indoorRounds: ISessionType = {
  portsmouth: {
    displayName: 'Portsmouth',
    distanceType: 'imperial',
    faceSize: 60,
    zoneScoring: ZoneScoringType.TenPoint,
    arrowsPerEnd: 6,
    variations: [
      {
        displayName: '',
        distances: [{ distance: 25, arrows: 60 }],
      },
    ],
  },
};
