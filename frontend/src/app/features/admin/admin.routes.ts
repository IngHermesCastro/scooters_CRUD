import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';

import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AssignmentFormComponent } from './assignments/assigment-form/assigment-form.component';



export const adminRoutes: Routes = [
  {
    path: '',
    canActivate: [roleGuard],
    data: { role: 'admin' },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'users/create',
        component: UserFormComponent
      },
      {
        path: 'users/edit/:id',
        component: UserFormComponent
      },
      {
        path: 'courses',
        component: CourseListComponent
      },
      {
        path: 'courses/create',
        component: CourseFormComponent
      },
      {
        path: 'courses/edit/:id',
        component: CourseFormComponent
      },
      {
        path: 'assignments',
        component: AssignmentFormComponent
      }
    ]
  }
];
