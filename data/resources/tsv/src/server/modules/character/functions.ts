import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { AddOneUserBucketAlreadyExistError, IBucket } from '../../../core/declares/bucket';
import { UserCharacter, UserNotFoundError } from '../../../core/declares/user';
import { IUser } from '../../../core/declares/user';
import { Crypto, Vector4 } from '../../../core/libs';
import { StatusManager } from '../../../core/libs/status';
import { InventoryManager } from '../../../core/libs/inventory';
import moduleConfig from './config';
import { tsv } from '../../../server';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: moduleConfig.debug,
};

function setCharacter(_: any, user: IUser, character: UserCharacter): IUser | Error {
  log.location = 'setCharacter()';

  try {
    const updatedUser = tsv.users.updateOne({
      id: user.id,
      position: new Vector4(
        character.position.x,
        character.position.y,
        character.position.z,
        character.position.w,
      ),
      characterDescription: character.description,
      inventories: character.inventories.length > 0 && new InventoryManager(character.inventories),
      status: character.status.length > 0 && new StatusManager(character.status),
      activities: character.activities,
    });
    return updatedUser;
  } catch (error) {
    if (error instanceof UserNotFoundError && process.env.NODE_ENV !== 'safemode') {
      global.DropPlayer(user.source, error.message);
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

    tsv.users.updateOne({ id: user.id, currentBucket: bucket.id });
  } catch (error) {
    if (error instanceof AddOneUserBucketAlreadyExistError || error instanceof UserNotFoundError) {
      global.DropPlayer(user.source, error.message);
    } else {
      return error;
    }
  }
}

export { setCharacter, setNewCharacterIntoBucket };
