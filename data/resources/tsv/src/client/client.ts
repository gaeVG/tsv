// Core class
import { Core } from '../core';
// Client libs
import { NUIManager, MenuManager, ActivityManager } from './lib';

class Client extends Core {
  nui: NUIManager;
  menus: MenuManager;
  activities: ActivityManager;

  constructor() {
    super();

    this.nui = new NUIManager();
    this.menus = new MenuManager();
    this.activities = new ActivityManager();
  }
}

export { Client };
