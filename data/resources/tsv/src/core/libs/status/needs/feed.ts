import { IStatus, StatusEnum } from '../../../declares/status';
import { Status } from '../status';
import config from '../../../../config';

class Feed extends Status {
  constructor(value?: number) {
    super({
      value: value || config.status[StatusEnum.HUNGER].max,
      name: StatusEnum.HUNGER,
      max: config.status[StatusEnum.HUNGER].max,
      consume: config.status[StatusEnum.HUNGER].consume,
    } as IStatus);
  }
}

export { Feed };
