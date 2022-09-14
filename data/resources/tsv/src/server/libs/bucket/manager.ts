import { BucketType, RemoveOneUserBucketError, IBucket } from '../../../core/declares/bucket';
import { IUser } from '../../../core/declares/user';
import { Bucket } from './bucket';
import { LogData } from '../../../core/declares/log';
import { EnumLogContainer } from '../../../core/declares/log';
import { Log } from '../../../core/libs/log';
import { tsv } from '../..';

const log: LogData = {
  namespace: 'Bucket',
  container: EnumLogContainer.Manager,
};

class BucketManager {
  manager: Bucket[];

  constructor() {
    this.manager = [];
  }

  get All() {
    return this.manager;
  }

  addUserIntoBucket(user: IUser, userBucket: BucketType): IBucket | Error {
    log.location = 'addUserIntoBucket()';
    Log.safemode({
      ...log,
      message: 'Adding user into bucket',
    });
    let bucketFound: Bucket;

    try {
      const manager = this.manager.reduce((bucketManager: Bucket[], currentBucket: Bucket) => {
        if (userBucket.id === currentBucket.id) {
          currentBucket.addUser(user);
          tsv.users.updateOne({
            ...user,
          });

          bucketFound = currentBucket;
        }

        bucketManager.push(currentBucket);
        return bucketManager;
      }, []);

      if (!bucketFound) {
        Log.safemode({
          ...log,
          message: 'Bucket not found, creating new bucket',
        });

        bucketFound = this.addOne(userBucket) as Bucket;
        manager.push(bucketFound);
      }

      this.manager = manager;

      return bucketFound;
    } catch (error) {
      return error;
    }
  }
  dropUserFromBucket(user: IUser): IBucket | Error {
    try {
      const bucketManager = this.manager.find((bucket) => user.currentBucket === bucket.id);
      if (bucketManager === undefined) {
        throw new RemoveOneUserBucketError(user);
      }

      bucketManager.removeUser(user);
      this.manager = this.manager.filter((bucket) => bucket.id !== bucketManager.id);

      if (bucketManager.host === user.serverId) {
        bucketManager.host =
          bucketManager.users.length > 0
            ? (bucketManager.host = (tsv.users.getOnebyId(bucketManager[0]) as IUser).serverId)
            : null;
      }

      return bucketManager;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }
  private addOne(bucket: BucketType): Bucket | Error {
    log.location = 'addOne()';
    Log.safemode({
      ...log,
      message: 'Adding new bucket',
    });

    if (!this.manager.find((bucketManager) => bucketManager.name === bucket.name)) {
      const newBucket = new Bucket(bucket);
      this.manager.push(newBucket);
      return newBucket;
    }

    return new Error('Bucket already exists');
  }
  getOne(getBucket: BucketType) {
    return this.manager.find((bucket) => bucket.id === getBucket.id);
  }
  newBucket(bucket: BucketType): IBucket | Error {
    return this.addOne(bucket);
  }
}

export { BucketManager };
