// Declarations
import { IStatus } from '@declares/status';
// Utils
import { uuid } from '@utils';

class Status implements IStatus {
  identifier: string;
  name: string;
  value: unknown;
  min?: number;
  max?: number;
  consume?: number;
  duration?: number;
  callback?: (...args: []) => void;
  callnext?: (...args: []) => void;

  constructor(status: IStatus) {
    this.identifier = uuid();
    this.name = status.name;
    this.value = status.value || 0;
    this.consume = status.consume || 1;
    this.min = status.min || 0;
    this.max = status.max || 100;
    this.duration = status.duration || 10;
    this.callback = status.callback;
    this.callnext = status.callnext;
  }
}

export { Status };
