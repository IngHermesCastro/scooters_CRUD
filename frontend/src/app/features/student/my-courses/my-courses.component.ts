import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { AssignmentService } from '../../../core/services/assignment.service';
import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
  courses: Course[] = [];
  loading: boolean = false;

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit() {
    this.loadMyCourses();
  }

  loadMyCourses() {
    this.loading = true;
    this.assignmentService.getMyCourses().subscribe({
      next: (response) => {
        this.loading = false;
        this.courses = response.data || [];
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar cursos', err);
      }
    });
  }

  getTotalHours(): number {
    return this.courses.reduce((total, course) => total + course.hours, 0);
  }
}
