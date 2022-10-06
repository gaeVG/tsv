import { ItemType, IItem } from '../../../../core/declares/item';
import { UsableItem } from './usableItem';
import moduleConfig from '../config';
import { EnumLogContainer, LogData } from '../../../../core/declares/log';

const log: LogData = {
  namespace: moduleConfig.name,
  container: EnumLogContainer.Class,
  isModuleDisplay: moduleConfig.debug,
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
