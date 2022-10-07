// Declarations
import { IStatus, StatusEnum } from '../../../declares/status';
// Status abstract class
import { Status } from '../status';
// Status config
import configStatus from '@config/status';

class Thrist extends Status {
  constructor(value?: number) {
    super({
      value: value || configStatus[StatusEnum.THRIST].max / 1.5,
      name: StatusEnum.THRIST,
      max: configStatus[StatusEnum.THRIST].max,
      consume: configStatus[StatusEnum.THRIST].consume,
    } as IStatus);
  }
}

export { Thrist };
