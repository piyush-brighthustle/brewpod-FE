export type User = {
  profile: {
    url: string;
    fileId: string;
  };
  _id: string;
  name: string;
  email: string;
  active: boolean;
  devices: Array<{
    device_id: string;
    status: boolean;
    connectedUsers: number;
  }>;
  createdAt: string;
  updatedAt: string;
  __v: number;
  age: number;
  external_auth: boolean;
  bookmarked_recipes: Array<string>;
};

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthProviderProps {
  children?: React.ReactNode;
}

export interface AuthContextData {
  authState: {
    isLoggedIn: boolean;
    error: string;
    loading: boolean;
  };
  authDispatch: React.Dispatch<any>;
}
