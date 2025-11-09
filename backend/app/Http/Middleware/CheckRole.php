<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Manejar una solicitud entrante.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string[]  ...$roles
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        // Si no hay usuario autenticado
        if (!$user) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        // Si el rol del usuario no está permitido
        if (!in_array($user->role, $roles)) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        return $next($request);
    }
}
