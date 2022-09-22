interface IEventTrigger {
  name: string;
  module?: string;
  target?: string | string[];
  onNet?: boolean;
  isLocal?: boolean;
  data?: unknown[];
  isCallback?: boolean;
}

export { IEventTrigger };
