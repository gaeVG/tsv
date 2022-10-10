/* eslint-disable no-fallthrough */
/* eslint-disable no-duplicate-case */
// Native wrapper
import { Game } from '@native/Game';
import { World } from '@native/World';
import { Model } from '@native/Model';
import { Scaleform } from '@native/ui';
import { Control } from '@native/enums';
import { Player, Prop } from '@native/models';
// Declarations
import { ItemType, IItem } from '@declares/item';
// Classes
import { Thread } from '@libs/thread';
// Usable item abstract class
import { UsableItem } from './usableItem';
// Core
import { tsv } from '@tsv';

// ATM pages enumeration
enum ATMCurrentPageEnum {
  ERROR = 0,
  MAIN = 1,
  WITHDRAW = 2,
  DEPOSIT = 3,
  TRANSFER = 4,
  SUCCESS = 5,
}
/// ATM button definition
type ATMButtonMenu = {
  slot: number;
  value: unknown;
  handler?: () => void;
};
// ATM page definition
type ATMCurrentPageType =
  | ATMCurrentPageEnum.MAIN
  | ATMCurrentPageEnum.WITHDRAW
  | ATMCurrentPageEnum.DEPOSIT
  | ATMCurrentPageEnum.TRANSFER
  | ATMCurrentPageEnum.SUCCESS
  | ATMCurrentPageEnum.ERROR;

/**
 * @class ATM
 * @extends Scaleform
 * @description
 * @author JustGod
 */
class ATM extends Scaleform {
  protected currentMenu: ATMCurrentPageType;
  protected itemSelected: number;
  protected thread: Thread;

  // Navigation keys
  private keys = [
    { key: Control.FrontendUp, action: () => this.callFunction('navigate', 'UP') },
    { key: Control.FrontendDown, action: () => this.callFunction('navigate', 'DOWN') },
    { key: Control.FrontendLeft, action: () => this.callFunction('navigate', 'LEFT') },
    { key: Control.FrontendRight, action: () => this.callFunction('navigate', 'RIGHT') },
    {
      key: Control.FrontendAccept,
      action: async () => {
        this.callVoidMethod('SET_INPUT_SELECT');
        const selection = this.callFunction('GET_CURRENT_SELECTION', 'returnResult') as number;
        await this.waitingFor();
        this.itemSelected = GetScaleformMovieMethodReturnValueInt(selection);
      },
    },
    { key: Control.FrontendCancel, action: () => this.reset() },
  ];
  // Buttons menus
  private buttons: { [0]: ATMButtonMenu[]; [1]: ATMButtonMenu[]; [2]: ATMButtonMenu[] } = {
    [0]: [
      // Main
      { slot: 0, value: 'Choisir un service.' },
      { slot: 1, value: 'Retirer' },
      { slot: 2, value: 'Déposer' },
      { slot: 4, value: 'Quitter' },
    ],
    [1]: [
      // Withdraw
      { slot: 0, value: 'Choisir un montant à retirer.' },
      { slot: 1, value: '10' },
      { slot: 2, value: '20' },
      { slot: 3, value: '50' },
      { slot: 5, value: '100' },
      { slot: 6, value: '200' },
      { slot: 7, value: '500' },
      { slot: 8, value: '1000' },
    ],
    [2]: [
      // Deposit
      { slot: 0, value: 'Choisir un montant à déposer.' },
      { slot: 1, value: '10' },
      { slot: 2, value: '20' },
      { slot: 3, value: '50' },
      { slot: 5, value: '100' },
      { slot: 6, value: '200' },
      { slot: 7, value: '500' },
      { slot: 8, value: '1000' },
      { slot: 4, value: 'Revenir en arrière' },
    ],
  };

  protected renderMenuScaleform(menu: number, message: string): void {
    switch (menu) {
      case ATMCurrentPageEnum.MAIN:
      case ATMCurrentPageEnum.WITHDRAW:
      case ATMCurrentPageEnum.DEPOSIT:
        this.callFunction('DISPLAY_BALANCE', 'Guy Teub', 'Banque: ', '1500');
      case ATMCurrentPageEnum.MAIN:
        this.callVoidMethod('DISPLAY_MENU');
        break;
      case ATMCurrentPageEnum.WITHDRAW:
      case ATMCurrentPageEnum.DEPOSIT:
        this.callVoidMethod('DISPLAY_CASH_OPTIONS');
        break;
      case ATMCurrentPageEnum.SUCCESS:
      case ATMCurrentPageEnum.ERROR:
        this.callFunction('SET_DATA_SLOT', 0, message);
        this.callFunction('SET_DATA_SLOT', 4, 'Retour');
        this.callVoidMethod('DISPLAY_MESSAGE');
        break;
    }
  }

  /**
   * Listen for a click on a button
   * @param {number} slot Button slot
   * @param {Function}handler Callback
   */
  protected onClick(slot: number, handler: () => void): void {
    this.callVoidMethod('SET_DATA_SLOT_EMPTY');

    if (this.itemSelected === slot) {
      this.itemSelected = null;
      handler();
    }
  }
  /**
   * Render the ATM scaleform
   * @param {number} renderMenu - Menu to render (`0: Main`, `1: Withdraw`, `2: Deposit`, `3: Transfer`, `4: Success`, `5: Error`)
   * @param message - Message to display
   * @param renderBack - The rendering should be displayed after current rendering
   */
  private render(renderMenu: number, message?: string, renderBack?: number) {
    console.log(renderMenu, message, renderBack);
    // Clean the render
    this.callVoidMethod('SET_DATA_SLOT_EMPTY');

    // Render all the buttons
    if (this.buttons[renderMenu]) {
      this.buttons[renderMenu].forEach((button: ATMButtonMenu) =>
        this.callFunction('SET_DATA_SLOT', button.slot, button.value),
      );
    }

    this.renderMenuScaleform(renderMenu, message);

    this.currentMenu = renderMenu;

    if (renderBack && this.IsLoaded) {
      this.render(renderBack);
    }
  }

  reset() {
    this.thread = null;
    this.itemSelected = null;
    this.currentMenu = null;
    //this.hide();
  }

  constructor() {
    super('ATM');
  }

  /**
   * run the ATM scaleform and wait for the user input
   * @returns {Promise<boolean | Error>} Return if the ATM has closed properly
   */
  run(): Promise<boolean | Error> {
    return new Promise(async (resolve) => {
      if (this.thread instanceof Thread) {
        return resolve(new Error('Thread already running'));
      }

      if (!this.IsLoaded) {
        await this.load();
      }
      this.render(ATMCurrentPageEnum.MAIN);

      this.thread = tsv.threads.createThread({
        name: 'scaleform-atm',
        timer: 5,
        isDUIThread: true,
        callback: () => {
          if (this.currentMenu === null) {
            this.thread = null;
            resolve(false);
            return false;
          }

          this.render2D();
          this.nagivation();
          this.listener();

          return true;
        },
      });
    });
  }
  /**
   * Listens for user actions based on the current menu
   */
  listener() {
    switch (this.currentMenu) {
      case ATMCurrentPageEnum.MAIN:
        this.onClick(ATMCurrentPageEnum.WITHDRAW, () => this.render(ATMCurrentPageEnum.WITHDRAW));
        this.onClick(ATMCurrentPageEnum.DEPOSIT, () => this.render(ATMCurrentPageEnum.DEPOSIT));

        break;
      case ATMCurrentPageEnum.WITHDRAW || ATMCurrentPageEnum.DEPOSIT:
        for (let slot = 1; slot < 9; slot++) {
          if (slot === 4) {
            continue;
          }

          this.onClick(slot, () => {
            if (this.currentMenu === ATMCurrentPageEnum.WITHDRAW) {
              console.log('retirer');
            } else {
              console.log('déposer');
            }
          });
        }
        break;
    }
  }
  /**
   * Navigate through the ATM menus
   */
  nagivation() {
    global.DisableAllControlActions(0);
    this.keys.forEach(
      (input) => Game.isDisabledControlJustPressed(0, input.key) && input.action.bind(this),
    );

    this.currentMenu !== ATMCurrentPageEnum.MAIN &&
      this.onClick(4, () => this.render(ATMCurrentPageEnum.MAIN));
  }

  onDepositSuccess(message: string) {
    if (this.IsLoaded) {
      this.render(ATMCurrentPageEnum.SUCCESS, message, ATMCurrentPageEnum.DEPOSIT);
    }
  }
  onDepositFailed(message: string) {
    if (this.IsLoaded) {
      this.render(ATMCurrentPageEnum.ERROR, message, ATMCurrentPageEnum.DEPOSIT);
    }
  }
}

class BankCard extends UsableItem {
  private propsModel = ['prop_atm_01', 'prop_atm_02', 'prop_atm_03', 'prop_fleeca_atm'];
  prop: Prop;
  atm: ATM;

  constructor(item: ItemType) {
    super(item);
    this.atm = new ATM();
  }

  async use(): Promise<IItem | Error> {
    try {
      const player = new Player();
      this.prop = this.propsModel.reduce((prop, currentPropModel) => {
        const model = new Model(currentPropModel);
        const atm = World.getClosestObject(model, player.Ped.Position, 1.0);

        if (atm !== null) {
          prop = atm;
        }
        return prop;
      }, undefined as Prop);

      if (this.prop === undefined) {
        throw new Error('No ATM found');
      }

      // TODO: Play player animation
      this.atm.run().then((error) => {
        if (error instanceof Error) {
          throw error;
        }
      });

      console.log('retour');

      return this as IItem;
    } catch (error) {
      console.log('une erreur est survenue');
      return error;
    }
  }
}

export { BankCard };
