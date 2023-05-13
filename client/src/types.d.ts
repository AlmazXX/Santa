export interface IRegister {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  avatar: File | null;
}

export type ILogin = Pick<IRegister, 'email' | 'password'>;

export interface User {
  _id: string;
  email: string;
  token: string;
  firstname: string;
  lastname: string;
  avatar: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  name: string;
  message: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface IPagination<Type> {
  [key: string]: Type[];
  currentPage: number;
  totalCount: number;
}

export interface ApiResponse<Type> {
  message: string;
  result: Type | IPagination<Type>;
}

export interface ApiParty {
  _id: string;
  title: string;
  image: string | null;
  creator: string;
  createdAt: string;
  updatedAt: string;
}

export interface IParty {
  title: string;
  image: File | null;
}

export interface ApiParticipant {
  _id: string;
  user: Omit<User, 'token'>;
  party: Pick<ApiParty, '_id' | 'title' | 'image'>;
  victim: string;
  createdAt: string;
  updatedAt: string;
}
