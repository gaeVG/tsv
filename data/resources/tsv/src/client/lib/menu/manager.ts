import { IMenu, MenuType } from '../../../core/declares/menu';
import { Menu } from './menu';
import { Log } from '../../../core/libs/log';
import { LogData, EnumLogContainer } from '../../../core/declares/log';

const log: LogData = {
  namespace: 'MenuManager',
  container: EnumLogContainer.Manager,
};

class MenuManager {
  private manager: Menu[];

  constructor() {
    this.manager = [];

    // RegisterNuiCallbackType('eventParadise');
    // on('__cfx_nui:eventParadise', ({ name, module, data }: NUIData<IMenu>) => {
    //   try {
    //     if (module === 'menu') {
    //       switch (name) {
    //         case 'updateMenu':
    //           this.getOne(data.name).close();
    //           break;
    //         case 'openMenu':
    //           this.openOne(data.name);
    //           break;
    //         case 'closeMenu':
    //           this.getOne(data.name).close();
    //           break;
    //         default:
    //           throw Error('Unknown menu event');
    //       }
    //     }
    //   } catch (error) {
    //     console.error(error instanceof Error ? error.message : error);
    //   }
    // });
  }

  get Manager(): IMenu[] {
    return this.manager;
  }

  private removeOne(menu: MenuType): void {
    const manager = this.manager.filter((menuManager) => menu.name !== menuManager.name);

    if (manager.length === this.manager.length) {
      return;
    }

    this.manager = manager;
  }
  private addOne(menu: MenuType): IMenu | boolean {
    const menuManager = this.manager.find((m) => m.type === menu.type);

    if (menuManager) {
      return false;
    }
    Log.debug({
      ...log,
      message: 'Create a new menu',
    });
    const newMenu = new Menu(menu);
    this.manager.push(newMenu);

    return newMenu;
  }
  private getOne(name: string): Menu {
    return this.manager.find((menu) => menu.name === name);
  }

  createMenu(menu: MenuType): IMenu {
    const menuCreated = this.addOne(menu);
    if (!menuCreated) {
      return null;
    }

    return menuCreated as IMenu;
  }

  openOne(name: string): void {
    const menu = this.getOne(name);

    if (!menu) {
      return;
    }

    menu.open();
  }
  closeAll(): void {
    this.manager.map((menu) => menu.close());
  }
}

export { MenuManager };
