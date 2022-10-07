// Declarations
import { IUser } from '@declares/user';
// Locale import
import _t from '@config/i18n';

class AddOneUserBucketAlreadyExistError extends Error {
  constructor(user: IUser) {
    super(_t('core.bucket.errors.addOneUserBucketAlreadyExist', { userName: user.Name }));
    this.name = 'AddOneUserBucketAlreadyExistError';
  }
}

export { AddOneUserBucketAlreadyExistError };
