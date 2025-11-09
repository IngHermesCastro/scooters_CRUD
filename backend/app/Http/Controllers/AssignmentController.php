<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AssignmentController extends Controller
{
    /**
     * Asignar uno o varios cursos a un usuario
     */
    public function assignCourses(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'course_ids' => 'required|array|min:1',
            'course_ids.*' => 'exists:courses,id',
        ], [
            'user_id.required' => 'El ID del usuario es obligatorio',
            'user_id.exists' => 'El usuario no existe',
            'course_ids.required' => 'Debes seleccionar al menos un curso',
            'course_ids.array' => 'Los cursos deben ser un array',
            'course_ids.*.exists' => 'Uno o más cursos no existen',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::find($request->user_id);

        // Asignar cursos (sync evita duplicados)
        $user->courses()->syncWithoutDetaching($request->course_ids);

        // Cargar los cursos actualizados
        $user->load('courses');

        return response()->json([
            'success' => true,
            'message' => 'Cursos asignados exitosamente',
            'data' => $user
        ], 200);
    }

    /**
     * Desasignar un curso de un usuario
     */
    public function unassignCourse(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
        ], [
            'user_id.required' => 'El ID del usuario es obligatorio',
            'user_id.exists' => 'El usuario no existe',
            'course_id.required' => 'El ID del curso es obligatorio',
            'course_id.exists' => 'El curso no existe',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::find($request->user_id);

        // Desasignar curso
        $user->courses()->detach($request->course_id);

        // Cargar los cursos actualizados
        $user->load('courses');

        return response()->json([
            'success' => true,
            'message' => 'Curso desasignado exitosamente',
            'data' => $user
        ], 200);
    }

    /**
     * Obtener cursos de un usuario (para alumnos)
     */
    public function myCourses(Request $request)
    {
        $user = $request->user();
        $courses = $user->courses;

        return response()->json([
            'success' => true,
            'data' => $courses
        ], 200);
    }

    /**
     * Obtener todos los cursos asignados de un usuario específico (para admin)
     */
    public function getUserCourses($userId)
    {
        $user = User::with('courses')->find($userId);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'courses' => $user->courses
            ]
        ], 200);
    }
}
