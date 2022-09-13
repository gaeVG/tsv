import { uuid } from '../../utils/uuid';

import { ICallback } from '../../declares/callback';

class Callback {
  identifier: string;
  name: string;
  module: string;
  handler: (...args: []) => void;

  constructor(callback: ICallback) {
    this.identifier = uuid();
    this.name = callback.name;
    this.module = callback.module;
    this.handler = callback.handler;
  }
}

export { Callback };
