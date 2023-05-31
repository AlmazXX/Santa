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
  createdPartyIds?: string[];
  userPartiesWithVictims?: [party: string, victim: string][];
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
  creator: string;
  image: string | null;
  gambled: string;
  createdAt: string;
  updatedAt: string;
}

export interface IParty {
  title: string;
  image: File | null;
}

export interface ApiParticipant {
  _id: string;
  user: Omit<ApiUser, 'token'>;
  party: Pick<ApiParty, '_id' | 'title' | 'creator' | 'image'>;
  victim: string;
  createdAt: string;
  updatedAt: string;
}

export interface IParticipant {
  user: string;
  party: string;
}

export interface IWishlist {
  party: string;
  user: string;
  title: string;
  address?: string;
  image?: File | null;
  description?: string;
}

export interface ApiWishlist {
  _id: string;
  user: string;
  party: string;
  title: string;
  address: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageLimit {
  page?: number;
  limit?: number;
}

type SearchParam<T> = {
  [P in keyof T]?: string | { $regex?: string; $options?: string };
} & PageLimit;
