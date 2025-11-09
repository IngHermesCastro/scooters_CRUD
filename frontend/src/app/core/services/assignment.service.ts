import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../app/environments/environment.development';
import { User } from '../models/user.model';
import { Course } from '../models/course.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private apiUrl = `${environment.apiUrl}/assignments`;

  constructor(private http: HttpClient) {}

  /**
   * Asignar cursos a usuario - POST /api/assignments/assign
   */
  assignCourses(userId: number, courseIds: number[]): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/assign`, {
      user_id: userId,
      course_ids: courseIds
    });
  }

  /**
   * Desasignar curso - POST /api/assignments/unassign
   */
  unassignCourse(userId: number, courseId: number): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/unassign`, {
      user_id: userId,
      course_id: courseId
    });
  }

  /**
   * Obtener mis cursos (alumno) - GET /api/my-courses
   */
  getMyCourses(): Observable<ApiResponse<Course[]>> {
    return this.http.get<ApiResponse<Course[]>>(`${environment.apiUrl}/my-courses`);
  }

  /**
   * Obtener cursos de un usuario (admin) - GET /api/assignments/user/{userId}
   */
  getUserCourses(userId: number): Observable<ApiResponse<{ user: User; courses: Course[] }>> {
    return this.http.get<ApiResponse<{ user: User; courses: Course[] }>>(`${this.apiUrl}/user/${userId}`);
  }
}
