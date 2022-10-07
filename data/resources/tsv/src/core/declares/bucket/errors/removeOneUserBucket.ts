// Declarations
import { IUser } from '@declares/user';

class RemoveOneUserBucketError extends Error {
  constructor(user: IUser) {
    super(`User ${user.Name} not found in bucket`);
  }
}

export { RemoveOneUserBucketError };
