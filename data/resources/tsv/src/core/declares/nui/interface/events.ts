interface NuiMessageData<T = unknown> {
  module: string;
  name: string;
  payload: T;
}

export { NuiMessageData };
