// Native wrapper
import { Vector4 } from '@native/utils';
// Declarations
import { LogData, EnumLogContainer } from '@declares/log';
import { AddOneUserBucketAlreadyExistError } from '@declares/bucket';
import { UserCharacter, UserNotFoundError } from '@declares/user';
import { IUser } from '@declares/user';
// Managers
import { StatusManager } from '@libs/status';
import { InventoryManager } from '@libs/inventory';
// Module
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.moduleName.charAt(0).toUpperCase() + config.moduleName.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: config.debug,
};

/**
 * Update the character from the server
 * @param {string} _playerSource - Source of the player
 * @param {IUser} user - User object to update
 * @param {UserCharacter} character - Character object to update
 * @returns {IUser | Error} Return the user object updated
 */
function setCharacter(
  _playerSource: string,
  setUser: IUser,
  character: UserCharacter,
): IUser | Error {
  log.location = 'setCharacter()';

  try {
    return tsv.users.updateOne({
      id: setUser.id,
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
  } catch (error) {
    if (error instanceof UserNotFoundError && process.env.NODE_ENV !== 'safemode') {
      global.DropPlayer(setUser.source, error.message);
    }
    return error;
  }
}
/**
 * Put the player in a specific bucket
 * @param _playerSource - Source of the player
 * @param user - User object to update
 * @returns {IBucket | Error} Returns the user object updated with the bucket
 */
function setNewCharacterIntoBucket(_playerSource: string, userPutIntoBucket: IUser): IUser | Error {
  try {
    const user = tsv.users.getOnebyId(userPutIntoBucket.id) as IUser;
    if (user instanceof Error) {
      throw user;
    }

    const bucket = tsv.buckets.addUserIntoBucket(user);
    if (bucket instanceof Error) {
      throw bucket;
    }

    return tsv.users.updateOne({ id: user.id, currentBucket: bucket.id });
  } catch (error) {
    if (error instanceof AddOneUserBucketAlreadyExistError || error instanceof UserNotFoundError) {
      global.DropPlayer(userPutIntoBucket.source, error.message);
    } else {
      return error;
    }
  }
}

export { setCharacter, setNewCharacterIntoBucket };
