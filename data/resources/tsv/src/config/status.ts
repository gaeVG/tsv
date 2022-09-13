import { StatusEnum } from '../core/declares/status';

export default {
  [StatusEnum.HEALTH]: {
    max: 200,
  },
  [StatusEnum.HUNGER]: {
    // ((4x)·15)·26 [time in minutes] = 1000
    consume: 64,
    max: 1000,
  },
  [StatusEnum.THRIST]: {
    // ((4x)·15)·30 [time in minutes] = 1000
    consume: 55,
    max: 1000,
  },
  [StatusEnum.ALCOHOL]: {
    consume: 2,
    max: 1000000,
  },
  [StatusEnum.DRUG]: {
    consume: 2,
    max: 1000000,
  },
};
