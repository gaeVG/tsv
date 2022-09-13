import { IUser } from '../';

class UserNotFoundError extends Error {
  constructor(user: IUser) {
    super(`User ${user.Name} not found`);
    this.name = 'UserNotFoundError';
  }
}

export { UserNotFoundError };
