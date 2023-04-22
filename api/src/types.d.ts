export interface IUser {
  email: string;
  password: string;
  token: string;
  role: 'admin' | 'user';
  firstName: string;
  lastName: string;
  avatar?: string;
  googleId?: string;
}
