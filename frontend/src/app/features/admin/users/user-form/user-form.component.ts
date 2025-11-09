import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userId: number | null = null;
  isEditMode: boolean = false;

  user: Partial<User> = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'alumno'
  };

  error: string = '';
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.userId) {
      this.isEditMode = true;
      this.loadUser();
    }
  }

  loadUser() {
    this.userService.getUser(this.userId!).subscribe({
      next: (response) => {
        this.user = response.data!;
        delete this.user.password; // No mostrar contraseña
      },
      error: (err) => {
        console.error('Error al cargar usuario', err);
      }
    });
  }

  onSubmit() {
    this.error = '';
    this.loading = true;

    const request = this.isEditMode
      ? this.userService.updateUser(this.userId!, this.user)
      : this.userService.createUser(this.user);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/users']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al guardar usuario';
      }
    });
  }
}
