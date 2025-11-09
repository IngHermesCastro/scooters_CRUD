<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\AssignmentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Rutas públicas (sin autenticación)
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas (requieren autenticación)
Route::middleware('auth:sanctum')->group(function () {

    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Rutas para ADMIN
    Route::middleware('role:admin')->group(function () {

        // CRUD Usuarios
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::get('/users/{id}', [UserController::class, 'show']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);

        // CRUD Cursos
        Route::get('/courses', [CourseController::class, 'index']);
        Route::post('/courses', [CourseController::class, 'store']);
        Route::get('/courses/{id}', [CourseController::class, 'show']);
        Route::put('/courses/{id}', [CourseController::class, 'update']);
        Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

        // Asignación de cursos
        Route::post('/assignments/assign', [AssignmentController::class, 'assignCourses']);
        Route::post('/assignments/unassign', [AssignmentController::class, 'unassignCourse']);
        Route::get('/assignments/user/{userId}', [AssignmentController::class, 'getUserCourses']);
    });

    // Rutas para ALUMNO
    Route::middleware('role:alumno')->group(function () {
        Route::get('/my-courses', [AssignmentController::class, 'myCourses']);
    });
});
