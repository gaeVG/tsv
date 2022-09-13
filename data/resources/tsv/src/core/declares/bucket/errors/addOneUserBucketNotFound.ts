import { IUser } from '../../user';

class AddOneUserBucketNotFoundError extends Error {
  constructor(user: IUser) {
    super(`User ${user.Name} not found in bucket`);
  }
}

export { AddOneUserBucketNotFoundError };
