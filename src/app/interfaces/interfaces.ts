export interface Register {
  username: string;
  image: string;
  password: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface Transfer {
  amount: number;
  username: string;
}

export interface ServerResponse {
  success: boolean;
  error: string;
}

export interface AuthResponse {
  token: string;
  id?: number;
}

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

export interface User {
  _id: string;
  username?: string;
  image?: string;
  balance: number;
}
