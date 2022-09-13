import character from './character';
import logs from './logs';
import hud from './hud';
import inventory from './inventory';
import menu from './menu';

export type NUIModule = {
  name: string;
  activate: boolean;
  render: React.FunctionComponent;
};

export type NUIModuleListener = {
  name: string;
  handler: (event: Event, ...data: unknown[]) => void;
};

export default [character, logs, hud, inventory, menu];
