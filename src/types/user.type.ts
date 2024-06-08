export interface IUserData {
  id: string;
  status: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}
