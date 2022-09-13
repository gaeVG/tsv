import React from 'react';

type NUIModule = {
  name: string;
  activate: boolean;
  render: React.FunctionComponent;
};

type NUIModuleListener = {
  name: string;
  handler: (event: Event, ...data: unknown[]) => void;
};

export { NUIModule, NUIModuleListener };
