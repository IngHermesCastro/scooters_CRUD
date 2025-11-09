import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../app/environments/environment.development';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  /**
   * Listar usuarios - GET /api/users
   */
  getUsers(filters?: { name?: string; email?: string; role?: string }): Observable<ApiResponse<User[]>> {
    let params = new HttpParams();

    if (filters?.name) params = params.set('name', filters.name);
    if (filters?.email) params = params.set('email', filters.email);
    if (filters?.role) params = params.set('role', filters.role);

    return this.http.get<ApiResponse<User[]>>(this.apiUrl, { params });
  }

  /**
   * Obtener usuario por ID - GET /api/users/{id}
   */
  getUser(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crear usuario - POST /api/users
   */
  createUser(user: Partial<User>): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.apiUrl, user);
  }

  /**
   * Actualizar usuario - PUT /api/users/{id}
   */
  updateUser(id: number, user: Partial<User>): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/${id}`, user);
  }

  /**
   * Eliminar usuario - DELETE /api/users/{id}
   */
  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
