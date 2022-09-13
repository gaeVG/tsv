import { Core } from '../core';
import { NUIManager } from './lib';
import { MenuManager } from './lib';
import { ActivityManager } from './lib/activity';
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
