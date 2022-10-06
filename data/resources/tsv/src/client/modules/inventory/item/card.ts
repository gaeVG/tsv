import { ItemType, IItem } from '../../../../core/declares/item';
import { UsableItem } from './usableItem';
import { Game, Control, Scaleform, Player, Prop, World, Model } from '../../../../core/libs';
import { Thread } from '../../../../core/libs/thread';
import { tsv } from '../../..';

enum ATMCurrentPageEnum {
  ERROR = 0,
  MAIN = 1,
  WITHDRAW = 2,
  DEPOSIT = 3,
  TRANSFER = 4,
  SUCCESS = 5,
}
type ATMCurrentPageType =
  | ATMCurrentPageEnum.MAIN
  | ATMCurrentPageEnum.WITHDRAW
  | ATMCurrentPageEnum.DEPOSIT
  | ATMCurrentPageEnum.TRANSFER
  | ATMCurrentPageEnum.SUCCESS
  | ATMCurrentPageEnum.ERROR;

type ATMButtonMenu = {
  slot: number;
  value: unknown;
  handler?: () => void;
};

/**
 * @class ATM
 * @extends Scaleform
 * @description
 * @author JustGod
 */
class ATM extends Scaleform {
  currentMenu: ATMCurrentPageType;
  itemSelected: number;
  thread: Thread;

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
  private buttons: { main: ATMButtonMenu[]; withdraw: ATMButtonMenu[]; deposit: ATMButtonMenu[] } =
    {
      main: [
        { slot: 0, value: 'Choisir un service.' },
        { slot: 1, value: 'Retirer' },
        { slot: 2, value: 'Déposer' },
        { slot: 4, value: 'Quitter' },
      ],
      withdraw: [
        { slot: 0, value: 'Choisir un montant à retirer.' },
        { slot: 1, value: '10' },
        { slot: 2, value: '20' },
        { slot: 3, value: '50' },
        { slot: 5, value: '100' },
        { slot: 6, value: '200' },
        { slot: 7, value: '500' },
        { slot: 8, value: '1000' },
      ],
      deposit: [
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

  constructor() {
    super('ATM');
  }

  async controls() {
    global.DisableAllControlActions(0);
    this.keys.forEach(
      (input) => Game.isDisabledControlJustPressed(0, input.key) && input.action.bind(this),
    );
  }

  drawMenu(): Promise<boolean | Error> {
    return new Promise((resolve) => {
      if (this.thread instanceof Thread) {
        return resolve(new Error('Thread already running'));
      }

      if (this.IsLoaded) {
        this.currentMenu = ATMCurrentPageEnum.MAIN;
        this.mainMenu();

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
            this.controls();

            this.buttons[this.currentMenu].forEach(
              (button: ATMButtonMenu) =>
                button.handler && this.onClick(button.slot, button.handler),
            );

            this.backMenuSelection();

            return true;
          },
        });
      }
    });
  }
  reset() {
    this.thread = null;
    this.itemSelected = null;
    this.currentMenu = null;
    //this.hide();
  }
  onClick(index: number, callback: () => void) {
    this.callVoidMethod('SET_DATA_SLOT_EMPTY');

    if (!callback) {
      this.thread == null;
      // return Console:warn('No callback set for Atm:onClick')
    }
    if (this.itemSelected === index) {
      this.itemSelected = null;
      callback();
    }
  }
  mainMenu() {
    this.buttons.main.forEach((button) =>
      this.callFunction('SET_DATA_SLOT', button.slot, button.value),
    );
    this.callFunction('DISPLAY_BALANCE', 'PlayerName', 'Banque: ', 'PlayerBank');
    this.callVoidMethod('DISPLAY_MENU');
  }
  withdrawMenu() {
    this.buttons.withdraw.forEach((button) =>
      this.callFunction('SET_DATA_SLOT', button.slot, button.value),
    );
    this.callFunction('DISPLAY_BALANCE', 'PlayerName', 'Banque: ', 'PlayerBank');
    this.callFunction('DISPLAY_CASH_OPTIONS');
  }
  depositMenu() {
    this.buttons.deposit.forEach((button) =>
      this.callFunction('SET_DATA_SLOT', button.slot, button.value),
    );
    this.callFunction('DISPLAY_BALANCE', 'PlayerName', 'Banque: ', 'PlayerName');
    this.callFunction('DISPLAY_CASH_OPTIONS');
  }
  successMenu(message: string) {
    this.callFunction('SET_DATA_SLOT', 0, message);
    this.callFunction('SET_DATA_SLOT', 4, 'Retour');
    this.callVoidMethod('DISPLAY_MESSAGE');
  }
  failedMenu(message: string) {
    this.callFunction('SET_DATA_SLOT', 0, message);
    this.callVoidMethod('DISPLAY_MESSAGE');
  }

  mainMenuSelection() {
    this.onClick(2, this.withdrawMenu);
    this.onClick(3, this.depositMenu);
  }
  withdrawMenuSelection() {
    this.buttons.withdraw.forEach(
      (button) =>
        button.slot !== 4 &&
        this.onClick(button.slot, async () => {
          const withDraw = (await tsv.events.trigger({
            name: 'withdrawBankAccount',
            module: 'bank',
            data: [button.value],
          })) as Promise<boolean>;

          if (this.IsLoaded) {
            if (!withDraw) {
              this.failedMenu("Vous n'avez pas assez d'argent sur votre compte.");
              this.currentMenu = ATMCurrentPageEnum.ERROR;
              this.onBackward(ATMCurrentPageEnum.WITHDRAW);
            } else {
              this.successMenu('Retrait effectué avec succès.');
              this.currentMenu = ATMCurrentPageEnum.SUCCESS;
              this.onBackward(ATMCurrentPageEnum.WITHDRAW);
            }
          }
        }),
    );
  }
  depositMenuSelection() {
    this.buttons.deposit.forEach(
      (button) =>
        button.slot !== 4 &&
        this.onClick(button.slot, async () => {
          try {
            const deposit = (await tsv.events.trigger({
              name: 'depositBankAccount',
              module: 'bank',
              data: [button.value],
            })) as Promise<boolean>;

            if (deposit === undefined) {
              throw new Error('depositBankAccount event is not defined');
            }

            this.onDepositSuccess('Super');
          } catch (error) {
            this.onDepositFailed(error);
          }
        }),
    );
  }
  backMenuSelection() {
    this.currentMenu !== ATMCurrentPageEnum.MAIN &&
      this.onClick(4, () => this.IsLoaded && this.mainMenu());
  }

  onBackward(goTo: ATMCurrentPageType) {
    if (this.IsLoaded) {
      this.currentMenu = goTo;

      switch (goTo) {
        case ATMCurrentPageEnum.DEPOSIT:
          this.depositMenu();
          break;
        case ATMCurrentPageEnum.WITHDRAW:
          this.withdrawMenu();
          break;
      }
    }
  }
  onDepositSuccess(message: string) {
    if (this.IsLoaded) {
      this.successMenu(message);
      this.currentMenu = ATMCurrentPageEnum.SUCCESS;
      this.onBackward(ATMCurrentPageEnum.DEPOSIT);
    }
  }
  onDepositFailed(message: string) {
    if (this.IsLoaded) {
      this.failedMenu(message);
      this.currentMenu = ATMCurrentPageEnum.ERROR;
      this.onBackward(ATMCurrentPageEnum.DEPOSIT);
    }
  }
}

class BankCard extends UsableItem {
  private propsModel = ['prop_atm_01', 'prop_atm_02', 'prop_atm_03', 'prop_fleeca_atm'];
  prop: Prop;

  constructor(item: ItemType) {
    super(item);
  }

  async use(): Promise<IItem | Error> {
    try {
      const player = new Player();
      this.prop = this.propsModel.reduce((_, currentPropModel) => {
        const model = new Model(currentPropModel);
        const atm = World.getClosestObject(model, player.Ped.Position, 1.0);
        return atm !== undefined && atm;
      }, undefined as Prop);

      if (this.prop === undefined) {
        throw new Error('No ATM found');
      }

      // TODO: Play player animation
      const atm = new ATM();

      const error = await atm.drawMenu();
      if (error instanceof Error) {
        throw error;
      } else {
        console.log(`J'ai utilisé la carte`);
      }
    } catch (error) {
      return error;
    }
  }
}

export { BankCard };
