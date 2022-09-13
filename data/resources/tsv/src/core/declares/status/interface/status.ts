interface IStatus {
  identifier: string;
  name: string;
  value: unknown;
  min?: number;
  max?: number;
  consume?: number;
  duration?: number;
  callback?: (...args: []) => void;
  callnext?: (...args: []) => void;
}

export { IStatus };
