import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CourseService } from '../../../../core/services/course.service';
import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filterName: string = '';

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    const filters = {
      name: this.filterName
    };

    this.courseService.getCourses(filters).subscribe({
      next: (response) => {
        this.courses = response.data || [];
      },
      error: (err) => {
        console.error('Error al cargar cursos', err);
      }
    });
  }

  deleteCourse(id: number) {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          this.loadCourses();
        },
        error: (err) => {
          console.error('Error al eliminar curso', err);
        }
      });
    }
  }

  applyFilters() {
    this.loadCourses();
  }

  clearFilters() {
    this.filterName = '';
    this.loadCourses();
  }
}
