export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: 'admin' | 'alumno';
  courses?: Course[];
  created_at?: string;
  updated_at?: string;
}

export interface Course {
  id: number;
  name: string;
  hours: number;
  created_at?: string;
  updated_at?: string;
  users?: User[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}
