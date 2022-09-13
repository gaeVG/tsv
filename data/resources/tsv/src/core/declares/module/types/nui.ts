import React from 'react';

export type NUIModule = {
  name: string;
  activate: boolean;
  render: React.FunctionComponent;
};

export type NUIModuleListener = {
  name: string;
  handler: (event: Event, ...data: unknown[]) => void;
};
