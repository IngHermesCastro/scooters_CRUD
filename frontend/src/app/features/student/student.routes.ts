import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';
import { MyCoursesComponent } from './my-courses/my-courses.component';

export const studentRoutes: Routes = [
  {
    path: '',
    canActivate: [roleGuard],
    data: { role: 'alumno' },
    children: [
      {
        path: '',
        redirectTo: 'my-courses',
        pathMatch: 'full'
      },
      {
        path: 'my-courses',
        component: MyCoursesComponent
      }
    ]
  }
];
