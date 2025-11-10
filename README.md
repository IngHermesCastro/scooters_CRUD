# 🎓 Sistema de Gestión de Cursos

Un sistema completo de gestión académica desarrollado con **Laravel 11 (API Backend)** y **Angular 19 (Frontend SPA)**.  
Permite el manejo de usuarios, cursos y asignaciones, con control de acceso por roles (Administrador y Alumno), autenticación JWT y arquitectura modular escalable.

---

## 🚀 Características Principales

- 🔐 **Autenticación JWT** mediante Laravel Sanctum
- 👥 **Gestión de usuarios** con roles `admin` y `alumno`
- 📚 **Gestión de cursos y asignaciones**
- ⚙️ **Arquitectura limpia** basada en controladores, servicios y middleware
- 🧩 **Frontend Angular 19** modular y tipado
- 💾 **Conexión API REST** con Interceptors y Guards
- 🌍 **Configuración multiambiente** (dev / prod)
- ✅ **Validaciones robustas** con Form Requests
- 🧱 **Lazy Loading** en módulos Angular

---

## 🏗️ Arquitectura del Proyecto

root/
├── backend/ # Proyecto Laravel (API)
│ ├── app/
│ ├── config/
│ ├── routes/
│ │ └── api.php
│ ├── database/
│ └── ...
│
└── frontend/ # Proyecto Angular 19
├── src/
│ ├── app/
│ │ ├── core/ # Servicios, guards e interceptores
│ │ ├── features/ # Módulos: auth, admin, student
│ │ ├── shared/ # Componentes comunes
│ │ └── app.routes.ts
│ └── environments/ # environment.ts y environment.development.ts
└── ...

---

## ⚙️ Requisitos Previos

Antes de comenzar asegúrate de tener instalado:

| Herramienta | Versión recomendada |
|--------------|--------------------|
| PHP | 8.2 o superior |
| Composer | 2.x |
| Node.js | 20.x o superior |
| Angular CLI | 19.x |
| MySQL o SQL Server | Compatible con Laravel |
| Git | Última versión |
| VS Code o IDE de preferencia | — |

---

## 📥 Clonación del Proyecto

Clona el repositorio y entra en el directorio:

```bash
git clone https://github.com/tu-usuario/sistema-cursos.git
cd sistema-cursos
