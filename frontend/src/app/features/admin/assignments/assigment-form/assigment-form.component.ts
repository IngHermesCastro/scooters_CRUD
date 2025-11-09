import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { UserService } from '../../../../core/services/user.service';
import { CourseService } from '../../../../core/services/course.service';
import { AssignmentService } from '../../../../core/services/assignment.service';
import { User } from '../../../../core/models/user.model';
import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-assignment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './assigment-form.component.html',
  styleUrl: './assigment-form.component.css'
})

export class AssignmentFormComponent implements OnInit {
  users: User[] = [];
  courses: Course[] = [];
  selectedUserId: number = 0;
  selectedCourseIds: number[] = [];

  userCourses: Course[] = [];
  error: string = '';
  success: string = '';
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadCourses();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data || [];
      }
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (response) => {
        this.courses = response.data || [];
      }
    });
  }

  onUserChange() {
    if (this.selectedUserId > 0) {
      this.loadUserCourses();
    } else {
      this.userCourses = [];
    }
  }

  loadUserCourses() {
    this.assignmentService.getUserCourses(this.selectedUserId).subscribe({
      next: (response) => {
        this.userCourses = response.data?.courses || [];
      }
    });
  }

  onCourseCheckChange(courseId: number, event: any) {
    if (event.target.checked) {
      this.selectedCourseIds.push(courseId);
    } else {
      this.selectedCourseIds = this.selectedCourseIds.filter(id => id !== courseId);
    }
  }

  assignCourses() {
    if (this.selectedUserId === 0 || this.selectedCourseIds.length === 0) {
      this.error = 'Selecciona un usuario y al menos un curso';
      return;
    }

    this.error = '';
    this.success = '';
    this.loading = true;

    this.assignmentService.assignCourses(this.selectedUserId, this.selectedCourseIds).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Cursos asignados exitosamente';
        this.selectedCourseIds = [];
        this.loadUserCourses();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al asignar cursos';
      }
    });
  }

  unassignCourse(courseId: number) {
    if (confirm('¿Desasignar este curso del usuario?')) {
      this.assignmentService.unassignCourse(this.selectedUserId, courseId).subscribe({
        next: () => {
          this.success = 'Curso desasignado exitosamente';
          this.loadUserCourses();
        },
        error: (err) => {
          this.error = err.error?.message || 'Error al desasignar curso';
        }
      });
    }
  }

  isCourseAssigned(courseId: number): boolean {
    return this.userCourses.some(c => c.id === courseId);
  }
}
