<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Listar todos los cursos
     */
    public function index(Request $request)
    {
        $query = Course::query();

        // Filtros opcionales
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->has('hours')) {
            $query->where('hours', $request->hours);
        }

        // Incluir usuarios si se solicita
        if ($request->has('with_users') && $request->with_users == 'true') {
            $query->with('users');
        }

        $courses = $query->get();

        return response()->json([
            'success' => true,
            'data' => $courses
        ], 200);
    }

    /**
     * Crear un nuevo curso
     */
    public function store(CourseRequest $request)
    {
        $course = Course::create([
            'name' => $request->name,
            'hours' => $request->hours,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Curso creado exitosamente',
            'data' => $course
        ], 201);
    }

    /**
     * Mostrar un curso específico
     */
    public function show($id)
    {
        $course = Course::with('users')->find($id);

        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Curso no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $course
        ], 200);
    }

    /**
     * Actualizar un curso
     */
    public function update(CourseRequest $request, $id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Curso no encontrado'
            ], 404);
        }

        $course->name = $request->name;
        $course->hours = $request->hours;
        $course->save();

        return response()->json([
            'success' => true,
            'message' => 'Curso actualizado exitosamente',
            'data' => $course
        ], 200);
    }

    /**
     * Eliminar un curso
     */
    public function destroy($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Curso no encontrado'
            ], 404);
        }

        $course->delete();

        return response()->json([
            'success' => true,
            'message' => 'Curso eliminado exitosamente'
        ], 200);
    }
}
