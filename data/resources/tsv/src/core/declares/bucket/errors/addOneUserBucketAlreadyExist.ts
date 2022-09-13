import _t from '../../../../config/i18n';
import { IUser } from '../../../../core/declares/user';

class AddOneUserBucketAlreadyExistError extends Error {
  constructor(user: IUser) {
    super(_t('core.bucket.errors.addOneUserBucketAlreadyExist', { userName: user.Name }));
    this.name = 'AddOneUserBucketAlreadyExistError';
  }
}

export { AddOneUserBucketAlreadyExistError };
