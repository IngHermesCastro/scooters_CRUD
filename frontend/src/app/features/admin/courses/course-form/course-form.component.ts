import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CourseService } from '../../../../core/services/course.service';
import { CourseRequest } from '../../../../core/models/course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
  courseId: number | null = null;
  isEditMode: boolean = false;

  course: CourseRequest = {
    name: '',
    hours: 0
  };

  error: string = '';
  loading: boolean = false;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute

  ) {}
onCancel(): void {
    this.router.navigate(['/admin/courses']);
  }
  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.courseId) {
      this.isEditMode = true;
      this.loadCourse();
    }
  }

  loadCourse() {
    this.courseService.getCourse(this.courseId!).subscribe({
      next: (response) => {
        this.course = {
          name: response.data!.name,
          hours: response.data!.hours
        };
      },
      error: (err) => {
        console.error('Error al cargar curso', err);
      }
    });
  }

  onSubmit() {
    this.error = '';
    this.loading = true;

    const request = this.isEditMode
      ? this.courseService.updateCourse(this.courseId!, this.course)
      : this.courseService.createCourse(this.course);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/courses']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al guardar curso';
      }
    });
  }
}
