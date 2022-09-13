interface ICallback {
  name: string;
  module: string;
  handler: (...args: []) => void;
}

export { ICallback };
