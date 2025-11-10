markdown# 🎓 Sistema de Gestión de Cursos

Sistema completo de gestión académica desarrollado con **Laravel 11 (API Backend)** y **Angular 19 (Frontend SPA)**.  
Permite la administración de usuarios, cursos y asignaciones con control de acceso basado en roles (**Administrador** y **Alumno**), autenticación mediante **JWT**, y una arquitectura modular, escalable y mantenible.

---

## 🚀 Características Principales

- 🔐 **Autenticación JWT** con Laravel Sanctum  
- 👥 **Gestión de usuarios** con roles `admin` y `alumno`  
- 📚 **Gestión completa de cursos y asignaciones alumno-curso**  
- ⚙️ **Arquitectura limpia** con controladores, servicios y middleware  
- 🧩 **Frontend Angular 19** modular, tipado y con lazy loading  
- 💾 **API RESTful** con interceptores HTTP y guards de ruta  
- 🌍 **Soporte multiambiente** (desarrollo / producción)  
- ✅ **Validaciones robustas** mediante Form Requests en Laravel  
- 🧱 **Lazy Loading** de módulos para optimización de carga  

---

## 🏗️ Arquitectura del Proyecto
root/
├── backend/                  # Laravel 11 (API REST)
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   ├── Middleware/
│   │   │   └── Requests/
│   │   ├── Models/
│   │   └── Services/
│   ├── config/
│   ├── routes/
│   │   └── api.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── .env.example
│
└── frontend/                 # Angular 19 (SPA)
├── src/
│   ├── app/
│   │   ├── core/         # Servicios, guards, interceptors
│   │   ├── features/     # Módulos: auth, admin, student
│   │   ├── shared/       # Componentes reutilizables
│   │   └── app.routes.ts
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.development.ts
│   └── assets/
└── angular.json
text---

## ⚙️ Requisitos Previos

| Herramienta            | Versión Recomendada       |
|------------------------|---------------------------|
| PHP                    | `>= 8.2`                  |
| Composer               | `2.x`                     |
| Node.js                | `>= 20.x`                 |
| Angular CLI            | `19.x`                    |
| MySQL / SQL Server     | Compatible con Laravel    |
| Git                    | Última versión            |
| Editor de código       | VS Code (recomendado)     |

---

## 📥 Instalación del Proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/IngHermesCastro/scooters_CRUD.git
cd scooters_CRUD

2. Configuración del Backend (Laravel)
bashcd backend
cp .env.example .env
composer install
Configurar .env
envAPP_NAME="Sistema de Gestión de Cursos"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cursos_db
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:4200
SESSION_DOMAIN=localhost
Generar clave y migrar base de datos
bashphp artisan key:generate
php artisan migrate --seed
El seeder crea:
Roles: admin, alumno
Usuario administrador por defecto:
Email: admin@cursos.com
Password: password


Iniciar servidor backend
bashphp artisan serve
API disponible en: http://localhost:8000

3. Configuración del Frontend (Angular)
bashcd ../frontend
npm install
Archivos de entorno
src/environments/environment.development.ts
tsexport const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  appName: 'Sistema de Gestión de Cursos',
  tokenKey: 'auth_token',
  userKey: 'current_user'
};
src/environments/environment.ts
tsexport const environment = {
  production: true,
  apiUrl: 'https://tu-dominio.com/api',
  appName: 'Sistema de Gestión de Cursos',
  tokenKey: 'auth_token',
  userKey: 'current_user'
};
Iniciar servidor de desarrollo
bashng serve
Frontend disponible en: http://localhost:4200

🧠 Flujo de Autenticación y Roles

























RolRuta BasePermisosAdmin/admin/*Gestión total de usuarios, cursos y asignacionesAlumno/student/*Visualización de cursos asignadosInvitado/loginSolo acceso al login
Protecciones

Backend: Middleware auth:sanctum + CheckRole
Frontend: authGuard + roleGuard en rutas


🔗 Endpoints Principales (API REST)

































































MétodoRutaDescripciónMiddlewarePOST/api/registerRegistrar usuario—POST/api/loginIniciar sesión (devuelve JWT)—GET/api/usersListar usuariosauth:sanctum, role:adminPOST/api/usersCrear usuarioauth:sanctum, role:adminPUT/api/users/{id}Actualizar usuarioauth:sanctum, role:adminDELETE/api/users/{id}Eliminar usuarioauth:sanctum, role:adminGET/api/coursesListar cursosauth:sanctumPOST/api/coursesCrear cursoauth:sanctum, role:adminPOST/api/assignmentsAsignar curso a alumnoauth:sanctum, role:admin

🧰 Estructura Funcional del Frontend
/core

auth.service.ts → Gestión de login, logout, token y usuario
auth.interceptor.ts → Inyecta JWT en headers
auth.guard.ts → Protege rutas autenticadas
role.guard.ts → Valida rol del usuario

/features

auth/ → Módulo de autenticación
admin/ → Dashboard, CRUD usuarios, cursos, asignaciones
student/ → Listado de cursos asignados

/shared

Componentes reutilizables: navbar, loader, modal, toast, etc.


🧱 Rutas Principales (Angular)
text/               → Redirige a /login
/login          → LoginComponent (público)

/admin          → (auth + role:admin)
├─ /dashboard
├─ /users
├─ /users/create
├─ /courses
└─ /assignments

/student        → (auth + role:alumno)
└─ /my-courses

🔒 Seguridad y Buenas Prácticas

Tokens JWT almacenados en localStorage con claves configurables
Todas las rutas protegidas con auth:sanctum y CheckRole
Validaciones server-side con Form Requests
CORS configurado exclusivamente para localhost:4200 (dev)
Lazy loading de módulos para mejor rendimiento
Interceptor automático de autenticación
Tipado estricto en Angular con interfaces


🧑‍💻 Ejemplo de Flujo Completo

Usuario accede a /login
Envía credenciales → POST /api/login
Laravel devuelve { token, user }
Angular guarda en localStorage
authInterceptor agrega Authorization: Bearer <token>
Según rol, redirige a /admin o /student


🧹 Scripts Útiles
Backend
bashphp artisan serve                  # Servidor local
php artisan migrate:fresh --seed   # Reiniciar DB con datos iniciales
php artisan route:list             # Listar rutas API
Frontend
bashng serve                           # Desarrollo
ng build --configuration production # Build para producción
ng generate component nombre       # Crear componente

🧪 Pruebas con Postman

POST /api/login → Obtener token
Usar header en todas las peticiones protegidas:

textAuthorization: Bearer <tu-token-jwt>
Colección recomendada: [Postman Collection (próximamente)]

🏁 Despliegue en Producción
Frontend
bashng build --configuration production
→ Copiar dist/frontend/ al servidor web (ej: /var/www/html)
Backend

Subir proyecto Laravel al servidor
Configurar .env con base de datos en producción
Ejecutar:

bashcomposer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan migrate --force
Asegúrate de actualizar environment.ts con la URL de producción.

🧑‍🏫 Autor
Hermes Castro
Desarrollador Full Stack | Ingeniero en Sistemas y Computación
📧 Email: 1hermescastro@gmail.com
🌐 Web: hermescastro.com
💼 LinkedIn: linkedin.com/in/hermescastro

🏷️ Licencia
MIT License — Uso libre con atribución.
“El mejor código no es el más complejo, sino el que todos entienden y pueden mejorar.” — Hermes Castro