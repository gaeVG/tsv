// Declarations
import { IStatus, StatusEnum } from '@declares/status';
// Status abstract class
import { Status } from '../status';
// Status config
import configStatus from '@config/status';

class Health extends Status {
  constructor(value?: number) {
    super({
      value: value || configStatus[StatusEnum.HEALTH].max,
      name: StatusEnum.HEALTH,
      max: configStatus[StatusEnum.HEALTH].max,
    } as IStatus);
  }
}

export { Health };
