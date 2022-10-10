// Declarations
import { ItemType, IItem } from '@declares/item';
import { EnumLogContainer, LogData } from '@declares/log';
// Usable item abstract class
import { UsableItem } from './usableItem';
// Module
import config from '../config';

// Log variable
const log: LogData = {
  namespace: config.moduleName,
  container: EnumLogContainer.Class,
  isModuleDisplay: config.debug,
};

type MoneyData = {
  amount: number;
  fake?: boolean;
};

type MoneyType = 'banknote' | 'coin';

class Money extends UsableItem {
  amount: number;
  moneyType: MoneyType;
  fake: boolean;

  constructor(item: ItemType) {
    super(item);
    this.amount = (item.metadata as MoneyData).amount;
    this.moneyType = Number.isInteger((this.metadata as MoneyData).amount) ? 'banknote' : 'coin';
    this.fake = (this.metadata as MoneyData).fake || false;
  }

  async use(): Promise<IItem | Error> {
    log.location = 'use(drink)';

    try {
      if (this.moneyType !== 'banknote') {
        throw new Error('You can only use banknotes');
      }
    } catch (error) {
      return error;
    }
  }
}

export { Money };
