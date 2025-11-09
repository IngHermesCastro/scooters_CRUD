<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relación muchos a muchos con Course
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_user')
                    ->withTimestamps();
    }

    // Verificar si es admin
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    // Verificar si es alumno
    public function isAlumno()
    {
        return $this->role === 'alumno';
    }
}
