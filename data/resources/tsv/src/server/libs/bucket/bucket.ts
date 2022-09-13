import {
  IBucket,
  BucketType,
  AddOneUserBucketAlreadyExistError,
  RemoveOneUserBucketError,
} from '../../../core/declares/bucket';
import { LogData } from '../../../core/declares/log';
import { IUser } from '../../../core/declares/user';
import { Crypto } from '../../../core/libs';
import { EnumLogContainer } from '../../../core/declares/log';
import config from '../../../config';
import { Log } from '../../../core/libs/log';
const _t = config.locale;

const log: LogData = {
  namespace: 'Bucket',
  container: EnumLogContainer.Class,
};

class Bucket implements IBucket {
  id: number;
  host: number;
  mode: 'strict' | 'relaxed' | 'inactive' | 'relaxed';

  constructor(bucket: BucketType) {
    log.location = _t('global.constructor');
    Log.safemode({
      ...log,
      message: 'Creating new bucket',
    });

    this.id = bucket.id !== undefined ? bucket.id : parseInt(Crypto.uuidv4(), 16);
    this.name = bucket.name !== undefined ? bucket.name : _t('global.default');
    this.host = bucket.host;
    this.users = [];
  }

  get users(): IUser['id'][] {
    return this.users;
  }
  set users(users: IUser['id'][]) {
    this.users = users;
  }

  get name(): string {
    return this.name;
  }
  private set name(name: string) {
    this.name = name;
  }

  addUser(user: IUser, isHost?: boolean): IUser['id'][] | Error {
    try {
      if (this.users.find((userBucket) => userBucket === user.id)) {
        throw new AddOneUserBucketAlreadyExistError(user);
      }

      if (global.GetPlayerRoutingBucket(user.source) !== this.id) {
        global.SetPlayerRoutingBucket(user.source, this.id);
      }

      if (this.users.length === 0) {
        global.SetRoutingBucketEntityLockdownMode(this.id, 'relaxed');
      }

      this.host = isHost ? user.serverId : this.host;
      this.users.push(user.id);
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }

      return new Error(error);
    }
  }
  removeUser(user: IUser): IUser['id'][] | Error {
    const usersBucket = this.users.filter((userBucket) => userBucket !== user.id);

    if (usersBucket.length === this.users.length) {
      return new RemoveOneUserBucketError(user);
    }

    this.users = usersBucket;

    this.users;
  }
}

export { Bucket };
