// Declarations
import { IEventListener } from '@declares/events';
// Module
import { getAccountByBankId, getUserAccount, getSocietyAccount, setAccount } from './functions';
import config from './config';

// Account module events descriptions
const accountEvents: IEventListener[] = [
  {
    name: 'getAccountByBankId',
    module: config.moduleName,
    onNet: true,
    isCallback: true,
    handler: getAccountByBankId,
  },
  {
    name: 'getUserAccount',
    module: config.moduleName,
    onNet: true,
    isCallback: true,
    handler: getUserAccount,
  },
  {
    name: 'getSocietyAccount',
    module: config.moduleName,
    onNet: true,
    isCallback: true,
    handler: getSocietyAccount,
  },
  {
    name: 'setAccount',
    module: config.moduleName,
    onNet: true,
    isCallback: true,
    handler: setAccount,
  },
];

export { accountEvents };
