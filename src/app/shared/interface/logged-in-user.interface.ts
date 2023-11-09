import { User } from './user.interface';

export interface LoggedInUser {
  accessToken: string;
  user: User;
}
