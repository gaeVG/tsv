import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { AddOneUserBucketAlreadyExistError, IBucket } from '../../../core/declares/bucket';
import { UserNotFoundError } from '../../../core/declares/user';
import { IUser } from '../../../core/declares/user';
import { Crypto } from '../../../core/libs';
import { IInventory } from '../../../core/declares/inventory';
import { StatusManager } from '../../../core/libs/status';
import { InventoryManager } from '../../../core/libs/inventory';
import { User } from '../../../core/libs/user';
import moduleConfig from './config';
import { tsp } from '../../../server';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: moduleConfig.debug,
};

function setCharacter(_: any, { id, character }: IUser): IUser | Error {
  log.location = 'setCharacter()';

  try {
    return tsv.users.updateOne({ id, character });
  } catch (error) {
    if (error instanceof UserNotFoundError && process.env.NODE_ENV !== 'safemode') {
      global.DropPlayer(id, error.message);
    }
    return error;
  }
}
function setNewCharacterIntoBucket(source: string, user: IUser): IBucket | Error {
  try {
    const tspUser = tsv.users.getOnebyId(user.id) as IUser;
    if (!tspUser) {
      return null;
    }

    const bucket = tsv.buckets.addUserIntoBucket(tspUser, {
      id: parseInt(Crypto.uuidv4(), 16),
      name: `newCharacter-user-${tspUser.id}`,
      host: tspUser.serverId,
    }) as IBucket;

    tsv.users.updateOne({
      ...user,
      currentBucket: bucket.id,
    });
  } catch (error) {
    if (error instanceof AddOneUserBucketAlreadyExistError || error instanceof UserNotFoundError) {
      global.DropPlayer(user.source, error.message);
    } else {
      return error;
    }
  }
}

export { setCharacter, setNewCharacterIntoBucket };
