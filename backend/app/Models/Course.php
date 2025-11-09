<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'hours',
    ];

    // Relación muchos a muchos con User
    public function users()
    {
        return $this->belongsToMany(User::class, 'course_user')
                    ->withTimestamps();
    }
}
