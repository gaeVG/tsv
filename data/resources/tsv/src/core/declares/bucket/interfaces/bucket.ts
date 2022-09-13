import { IUser } from '../../user';

interface IBucket {
  id: number;
  name: string;
  host: number;
  users: IUser['id'][];
  mode: 'strict' | 'relaxed' | 'inactive' | 'relaxed';

  addUser(user: IUser, isHost?: boolean): IUser['id'][] | Error;
  removeUser(user: IUser): IUser['id'][] | Error;
}

export { IBucket };
