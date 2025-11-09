import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../app/environments/environment.development';
import { Course, CourseRequest } from '../models/course.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  /**
   * Listar cursos - GET /api/courses
   */
  getCourses(filters?: { name?: string; hours?: number; with_users?: boolean }): Observable<ApiResponse<Course[]>> {
    let params = new HttpParams();

    if (filters?.name) params = params.set('name', filters.name);
    if (filters?.hours) params = params.set('hours', filters.hours.toString());
    if (filters?.with_users) params = params.set('with_users', 'true');

    return this.http.get<ApiResponse<Course[]>>(this.apiUrl, { params });
  }

  /**
   * Obtener curso por ID - GET /api/courses/{id}
   */
  getCourse(id: number): Observable<ApiResponse<Course>> {
    return this.http.get<ApiResponse<Course>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crear curso - POST /api/courses
   */
  createCourse(course: CourseRequest): Observable<ApiResponse<Course>> {
    return this.http.post<ApiResponse<Course>>(this.apiUrl, course);
  }

  /**
   * Actualizar curso - PUT /api/courses/{id}
   */
  updateCourse(id: number, course: CourseRequest): Observable<ApiResponse<Course>> {
    return this.http.put<ApiResponse<Course>>(`${this.apiUrl}/${id}`, course);
  }

  /**
   * Eliminar curso - DELETE /api/courses/{id}
   */
  deleteCourse(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
