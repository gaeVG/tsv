// Declarations
import { EnumLogContainer, LogData } from '@declares/log';
import { IActivity } from '@declares/activity';
import { AccountType, IAccount } from '@declares/account';
// Log class
import { Log } from '@libs/log';
// Activity library
import { Account } from './account';
// Application config
import i18n from '@config/i18n';

// Locale function
const _t = i18n;

// Log variable
const log: LogData = {
  namespace: 'CoreUser',
  container: EnumLogContainer.Manager,
};

class AccountManager {
  private manager: Account[];

  constructor(activities: AccountType[]) {
    log.location = 'constructor()';
    Log.safemode({
      ...log,
      message: _t('core.user.manager.constructor.creating'),
    });
    this.manager = [];

    try {
      activities.map((activities) => this.addOne(activities));
    } catch (error) {
      Log.debug({
        ...log,
        message: _t('core.user.manager.constructor.error', { error: error.message }),
      });
    }
    Log.safemode({
      ...log,
      message: _t('core.user.manager.constructor.complete'),
    });
  }

  get All(): Account[] {
    return this.manager;
  }

  addOne(account: AccountType): Account | Error {
    try {
      if (account.id && this.getOnebyId(account.id) !== undefined) {
        throw new Error(`Activity ID ${account.id} already exists`);
      } else {
        if (this.getOneByName(account.from) !== undefined) {
          throw new Error(`Activity ${account.from} already exists`);
        }
      }

      const activity = new Account(account);
      this.manager.push(activity);
      return activity;
    } catch (error) {
      return error;
    }
  }
  getOnebyId(id: unknown): Account | undefined {
    return this.manager.find((user) => user.id === id);
  }
  getOneByName(name: string): Account | undefined {
    return this.manager.find((account) => account.from === name);
  }
  removeOne(removeActivity: IActivity): [IActivity, number] | Error {
    const manager = this.manager.filter((user) => user.id !== removeActivity.id);
    if (manager.length === this.manager.length) {
      new Error(_t('core.user.manager.removeOne.userNotFound', { userId: removeActivity.id }));
    }

    this.manager = manager;
    return [removeActivity, manager.length];
  }
  updateOne(updateAccount: IAccount): [IAccount, number] | Error {
    try {
      const accountManager = this.getOnebyId(updateAccount.id);
      if (accountManager === undefined) {
        throw Error(_t('core.user.manager.updateOne.userNotFound', { userId: updateAccount.id }));
      }

      Object.entries(updateAccount).forEach(
        ([activityKey, activityVal]) => (accountManager[activityKey] = activityVal),
      );

      this.manager = this.manager.reduce((manager: Account[], activity: Account) => {
        if (accountManager.id === activity.id) {
          manager.push(accountManager);
        } else {
          manager.push(activity);
        }
        return manager;
      }, []);
      return [accountManager, this.manager.length];
    } catch (error) {
      return error;
    }
  }
}

export { AccountManager };
