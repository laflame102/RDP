export interface User {
  id: number;
  email: string;
  createdAt: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LoginData extends RegisterData {}

export interface AuthResponse {
  user: User;
  message: string;
}
