// Declarations
import { IStatus, StatusEnum } from '@declares/status';
// Status abstract class
import { Status } from '../status';
// Locale import
import status from '@config/status';

class Feed extends Status {
  constructor(value?: number) {
    super({
      value: value || status[StatusEnum.HUNGER].max,
      name: StatusEnum.HUNGER,
      max: status[StatusEnum.HUNGER].max,
      consume: status[StatusEnum.HUNGER].consume,
    } as IStatus);
  }
}

export { Feed };
