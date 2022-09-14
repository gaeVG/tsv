import { User } from './user';
import { IUser, UserNotFoundError } from '../../declares/user';
import { EnumLogContainer, LogData } from '../../declares/log';
import { Log } from '../log';
import config from '../../../config';

const _t = config.locale;

const log: LogData = {
  namespace: 'CoreUser',
  container: EnumLogContainer.Manager,
};

class UserManager {
  private manager: User[];

  constructor() {
    log.location = 'constructor()';
    Log.safemode({
      ...log,
      message: _t('core.user.manager.constructor.creating'),
    });
    this.manager = [];
    Log.safemode({
      ...log,
      message: _t('core.user.manager.constructor.complete'),
    });
  }

  get All(): User[] {
    return this.manager;
  }

  addOne(addUser: IUser): User | null {
    log.location = 'addOne()';
    try {
      if (this.manager.find((userManager) => addUser.id === userManager.id)) {
        throw new Error(_t('core.user.manager.addOne.userAlreadyExists', { userId: addUser.id }));
      }

      const user = new User(addUser);

      this.manager.push(user);
      return user;
    } catch (error) {
      Log.error({
        ...log,
        message: error instanceof Error ? error.message : (error as string),
      });
      return null;
    }
  }
  getOnebyId(id: string): User | Error {
    try {
      const user = this.manager.find((user) => user.id === id);
      if (user === undefined) {
        throw new UserNotFoundError({ id: id });
      }

      return user;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }
  getOneBySource(source: string): User | Error {
    try {
      const user = this.manager.find((user) => user.source === source);
      if (user === undefined) {
        throw new UserNotFoundError({ id: undefined, source: source });
      }

      return user;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }
  getOneByIdentifier(identifier: string, identifierType?: string): User | undefined {
    return this.manager.find((user) => {
      if (user.identifiers === undefined) {
        return false;
      }

      if (identifierType && identifier === user.identifiers[identifierType]) {
        return true;
      } else {
        let userFound = false;
        Object.entries(user.identifiers).find(([identifierKey, identifierVal]) => {
          userFound = identifier.startsWith(identifierKey) && identifier === identifierVal;
        });

        return userFound;
      }
    });
  }
  removeOne(removeUser: IUser): boolean {
    const manager = this.manager.filter((user) => user.id !== removeUser.id);

    if (manager.length === this.manager.length) {
      Log.warning({
        ...log,
        location: 'removeOne()',
        message: _t('core.user.manager.removeOne.userNotFound', { userId: removeUser.id }),
      });
      return false;
    }

    this.manager = manager;
    return true;
  }
  updateOne(updateUser: IUser): IUser | Error {

    try {
      let userFound : User;
      this.manager = this.manager.reduce((userManager, currentUser) => {
        if (currentUser.id === updateUser.id) {
          Object.entries(updateUser).forEach(([userKey, userVal]) => {
            currentUser[userKey] = userVal;
          });          
          userManager.push(currentUser);
          userFound = currentUser;
        }
        return userManager;
      }, [] as User[]);

      if (!userFound) {
        throw new Error(_t('core.user.manager.updateOne.userNotFound', { userId: updateUser.id }));
      }
      return userFound;
    } catch (error) {
      Log.error({
        ...log,
        location: 'updateOne()',
        message: error instanceof Error ? error.message : (error as string),
      });
      
      return error;
    }
  }
}

export { UserManager };
