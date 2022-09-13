import { IStatus, StatusEnum } from '../../../declares/status';
import { Status } from '../status';
import config from '../../../../config';

class Health extends Status {
  constructor(value?: number) {
    super({
      value: value || config.status[StatusEnum.HEALTH].max,
      name: StatusEnum.HEALTH,
      max: config.status[StatusEnum.HEALTH].max,
    } as IStatus);
  }
}

export { Health };
