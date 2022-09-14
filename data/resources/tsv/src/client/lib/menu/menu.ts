import {
  ButtonMenuType,
  IMenu,
  IMenuButton,
  MenuType,
  TypeMenuType,
  TypeButtonMenuType,
  TypeButtonMenuEnum,
} from '../../../core/declares/menu';
import { NUIMessage } from '../../../core/declares/nui';
import { Log } from '../../../core/libs/log';
import { EnumLogContainer, LogData } from '../../../core/declares/log';
import { tsv } from '../..';
import { Game } from '../../../core/libs';
import { IconType } from '../../../core/declares/nui';

const log: LogData = {
  namespace: 'Menu',
  container: EnumLogContainer.Class,
};

class MenuButton implements IMenuButton {
  index: number;
  type: TypeButtonMenuType;
  name: string;
  value: unknown;
  previous_value: unknown;
  values: unknown[];
  min?: number;
  max?: number;
  disabled?: boolean;
  icon?: IconType;
  description?: string;

  constructor(button: ButtonMenuType) {
    this.type = button.type;
    this.name = button.name;
    this.value = button.value;
    this.previous_value = button.value;
    this.min = button.min;
    this.max = button.max;
    this.disabled = false;
    this.icon = button.icon;
    this.description = button.description;
  }

  onSelected: (menu: IMenuButton) => void;
}

class Menu implements IMenu {
  hidden: boolean;
  type: TypeMenuType;
  module: string;
  name: string;
  title: string;
  subtitle?: string;
  position?: string;
  size?: string;
  colors?: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  buttons: IMenuButton[];

  private enableControlMenu(): void {
    tsv.threads.createThread({
      name: `controlMenu-${this.name}`,
      timer: 128,
      callback: () => {
        let control: string;

        if (Game.isControlPressed(0, 27)) {
          control = 'up';
        } else if (Game.isControlPressed(0, 173)) {
          control = 'down';
        } else if (Game.isControlPressed(0, 174)) {
          control = 'left';
        } else if (Game.isControlPressed(0, 175)) {
          control = 'right';
        }

        if (control !== undefined) {
          tsv.nui.trigger({
            module: 'menu',
            name: 'setControlMenu',
            payload: control,
          });
        }

        return true;
      },
    });
  }

  constructor(menu: MenuType) {
    try {
      this.hidden = true;
      this.type = menu.type;
      this.module = menu.module;
      this.name = menu.name;
      this.subtitle = menu.subtitle || '';
      this.title = menu.title;
      this.buttons = menu.buttons.map((button) => {
        if (button.type === TypeButtonMenuEnum.RANGE || button.type === TypeButtonMenuEnum.SLIDER) {
          if (!button.min || !button.max) {
            throw new Error('Range button must have min and max');
          }
        }
        return new MenuButton(button);
      });
    } catch (error) {
      Log.error({
        ...log,
        message: error instanceof Error ? error.message : error,
      });
      return null;
    }
  }

  open(): void {
    if (this.type === 'default') {
      this.enableControlMenu();
    } else {
      SetNuiFocus(true, true);
    }
    SendNUIMessage({
      module: 'menu',
      name: 'openMenu',
      payload: {
        ...this,
        hidden: false,
      } as IMenu,
    } as NUIMessage);
    this.hidden = false;
  }
  close(): void {
    SendNUIMessage({
      module: 'menu',
      name: 'closeMenu',
      payload: {
        ...this,
        hidden: true,
      } as IMenu,
    } as NUIMessage);
    this.hidden = true;
    SetNuiFocus(false, false);
  }
  update(menu: IMenu): void {
    try {
      SendNUIMessage({
        module: 'menu',
        name: 'updateMenu',
        payload: {
          ...this,
          ...menu,
        } as IMenu,
      });

      Object.entries(menu).forEach(([key, value]) => {
        this[key] = value;
      });
    } catch (error) {
      Log.debug({
        ...log,
        message: error instanceof Error ? error.message : error,
      });
    }
  }
}

export { Menu };
