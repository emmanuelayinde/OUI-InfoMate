
export interface ILoginCredentials {
  username: string;
  password: string;
}

export interface IRegisterCredentials {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface IUserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
  token?: IAuthToken;
}

export interface IAuthToken {
  access_token: string;
  token_type: string;
}

export interface IAuth {
  isAuthenticated: boolean;
  userProfile: IUserProfile | null;
  setUserProfile: (profile: IUserProfile) => void;
  login: (token: IAuthToken) => void;
  logout: () => void;
}

export interface ISystemPrompt {
  id: number;
  content: string;
  version: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: number;
}

export interface IUpdateSystemPromptRequest {
  content: string;
  version?: string;
}
