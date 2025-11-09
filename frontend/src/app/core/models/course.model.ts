export interface Course {
  id: number;
  name: string;
  hours: number;
  created_at?: string;
  updated_at?: string;
  users?: User[];
}

export interface CourseRequest {
  name: string;
  hours: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}
