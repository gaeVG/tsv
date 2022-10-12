// Dependencies
import { ObjectID } from 'typeorm';
// Declarations
import { LogData, EnumLogContainer } from '@declares/log';
import { IUser } from '@declares/user';
import { IAccount } from '@declares/account';
// Module
import config from './config';
// ORM entities
import { Accounts as AccountEntity } from '@entities';
// Core
import { tsv } from '@tsv';
import { ISociety } from '@declares/society';
import { User } from '@libs/user';
import { Society } from '@libs/society';

// Log variable
const log: LogData = {
  namespace: `Module${config.moduleName.charAt(0).toUpperCase() + config.moduleName.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: config.debug,
};

/**
 * Recover the account by bank id from database
 * @param {string} _source - Source of the player
 * @param {string} accountId - Container of the account to recover
 * @returns {Promise<IAccount | Error>} Return the account from database
 */
async function getAccountByBankId(_source: string, accountId: string): Promise<IAccount | Error> {
  try {
    return ((await tsv.orm.dataSource.getMongoRepository(AccountEntity).find()) as IAccount[]).find(
      (account) => account.id.toString() === accountId,
    );
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });
  }
}
/**
 * Recover the account by bank id from database
 * @param {string} _source - Source of the player
 * @param {string} accountId - Container of the account to recover
 * @returns {Promise<IAccount | Error>} Return the account from database
 */
async function getUserAccount(
  source: string,
  account?: IAccount,
  target?: string,
): Promise<IAccount | IAccount[] | Error> {
  try {
    const user = target ? tsv.users.getOnebyId(target) : tsv.users.getOneBySource(source);
    if (user instanceof Error) {
      throw user;
    }

    if (account) {
      return user.accounts.getOnebyId(account.id);
    }

    return user.accounts.All;
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });
  }
}
/**
 * Recover the society account
 * @param {string} source - Source of the player
 * @param {IAccount} account - Container of the account to recover
 * @param {string} target - Source of the target
 * @returns {Promise<IAccount | Error>} Return the account from database
 */
async function getSocietyAccount(
  _source: string,
  account?: IAccount,
  target?: string,
): Promise<IAccount | IAccount[] | Error> {
  try {
    const society = tsv.societies.getOnebyId(target);
    if (society instanceof Error) {
      throw society;
    }

    if (account) {
      return society.accounts.getOnebyId(account.id);
    }

    return society.accounts.All;
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });
  }
}
/**
 * Set the account of the target, or by default the account of the player
 * @param {string} _source - Source of the player
 * @param {IUser | ISociety} setCustomer - Customer to set the account
 * @param {IAccount} setAccount - Account to set
 * @returns {Promise<IAccount | Error>} Return the account from database
 */
function setAccount(
  _source: string,
  setCustomer: IUser | ISociety,
  setAccount: IAccount,
): IAccount | Error {
  try {
    const customer =
      'source' in setCustomer
        ? (tsv.users.getOnebyId(setCustomer.id) as User)
        : (tsv.societies.getOnebyId(setCustomer.id) as Society);
    if (customer instanceof Error) {
      throw customer;
    }

    customer.accounts.updateOne(setAccount);

    if (customer instanceof User) {
      tsv.users.updateOne(customer);
    } else if (customer instanceof Society) {
      tsv.societies.updateOne(customer);
    }

    return customer.accounts.getOnebyId(setAccount.id);
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });
    return error;
  }
}

export { getAccountByBankId, getUserAccount, getSocietyAccount, setAccount };
