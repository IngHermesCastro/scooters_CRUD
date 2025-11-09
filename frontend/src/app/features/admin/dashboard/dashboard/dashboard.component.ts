import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { UserService } from '../../../../core/services/user.service';
import { CourseService } from '../../../../core/services/course.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalCourses: number = 0;

  constructor(
    private userService: UserService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.totalUsers = response.data?.length || 0;
      }
    });

    this.courseService.getCourses().subscribe({
      next: (response) => {
        this.totalCourses = response.data?.length || 0;
      }
    });
  }
}
