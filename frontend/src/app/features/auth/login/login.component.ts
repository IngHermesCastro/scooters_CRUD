import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Agregar funcionalidad para mostrar/ocultar contraseña
    this.setupPasswordToggle();
  }

  onSubmit() {
    this.error = '';
    this.loading = true;

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          this.loading = false;

          // Redirigir según el rol
          if (response.data.user.role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/student/my-courses']);
          }
        },
        error: (err) => {
          this.loading = false;
          this.error = err.error?.message || 'Error al iniciar sesión';
        }
      });
  }
  setupPasswordToggle() {
    // Esta función se ejecutaría después de que la vista se inicialice
    setTimeout(() => {
      const toggleButton = document.getElementById('togglePassword');
      const passwordInput = document.getElementById('password') as HTMLInputElement;

      if (toggleButton && passwordInput) {
        toggleButton.addEventListener('click', () => {
          const type = passwordInput.type === 'password' ? 'text' : 'password';
          passwordInput.type = type;
          toggleButton.innerHTML = type === 'password' ?
            '<i class="bi bi-eye-fill"></i>' :
            '<i class="bi bi-eye-slash-fill"></i>';
        });
      }
    });
  }
}
