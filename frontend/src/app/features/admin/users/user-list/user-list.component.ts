import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filterName: string = '';
  filterEmail: string = '';
  filterRole: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const filters = {
      name: this.filterName,
      email: this.filterEmail,
      role: this.filterRole
    };

    this.userService.getUsers(filters).subscribe({
      next: (response) => {
        this.users = response.data || [];
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error al eliminar usuario', err);
        }
      });
    }
  }

  applyFilters() {
    this.loadUsers();
  }

  clearFilters() {
    this.filterName = '';
    this.filterEmail = '';
    this.filterRole = '';
    this.loadUsers();
  }
}
