interface IEventListener {
  name: string;
  module: string;
  handler: (...args: unknown[]) => any;
  onNet?: boolean;
  isCallback?: boolean;
  isLocal?: boolean;
  target?: number;
}

export { IEventListener };
