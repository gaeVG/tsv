interface IEventTrigger {
  name: string;
  module?: string;
  target?: number | string;
  onNet?: boolean;
  isLocal?: boolean;
  data?: unknown[];
  callback?: (...args: unknown[]) => void;
}

export { IEventTrigger };
