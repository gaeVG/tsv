import { MenuControl } from './MenuControl';
export class MenuControls {
  constructor() {
    this.back = new MenuControl();
    this.select = new MenuControl();
    this.left = new MenuControl();
    this.right = new MenuControl();
    this.up = new MenuControl();
    this.down = new MenuControl();
  }
}
