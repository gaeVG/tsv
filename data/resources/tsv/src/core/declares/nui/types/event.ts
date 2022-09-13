type NUIListener = {
  name: string;
  module: string;
  removeAfterTriggered?: true;
  handler: (...data: unknown[]) => unknown;
};

type NUIMessage = {
  module: string;
  name: string;
  payload?: unknown;
};

type NUIData<T = any> = {
  name: string;
  module: string;
  data: T;
  callback: (response: unknown) => void;
};

export { NUIListener, NUIMessage, NUIData };
