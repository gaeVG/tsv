import { IStatus, StatusEnum } from '../../../declares/status';
import { Status } from '../status';
import config from '../../../../config';

class Thrist extends Status {
  constructor(value?: number) {
    super({
      value: value || config.status[StatusEnum.THRIST].max / 1.5,
      name: StatusEnum.THRIST,
      max: config.status[StatusEnum.THRIST].max,
      consume: config.status[StatusEnum.THRIST].consume,
    } as IStatus);
  }
}

export { Thrist };
