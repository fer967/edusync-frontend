🚀 EduSync Frontend

Frontend oficial de EduSync, una plataforma educativa web para gestión de cursos, lecciones y seguimiento de progreso académico.

Desarrollado con Angular 19 (Standalone Components) y Angular Material.

🌐 Demo

🔗 Producción: (agregar URL cuando quieras)
🔗 Backend API: https://edusync-backend-x316.onrender.com

📌 Descripción

EduSync es una plataforma LMS (Learning Management System) que permite:

Registro y autenticación de usuarios

Gestión de roles (Admin / Estudiante)

Visualización de cursos

Gestión de lecciones

Descarga de materiales (Cloudinary)

Seguimiento de progreso

Panel administrativo

🧩 Arquitectura

El proyecto utiliza:

Angular 19

Standalone Components

Angular Material

Guards para protección de rutas

JWT almacenado en localStorage

Arquitectura modular por features

Routing con Layout principal

Responsive design

🗂️ Estructura del proyecto
src/
 ├── app/
 │   ├── admin/              → Panel de administración
 │   ├── courses/            → Lista de cursos
 │   ├── course-detail/      → Detalle y progreso
 │   ├── dashboard/          → Panel del estudiante
 │   ├── home/               → Página principal
 │   ├── how-it-works/       → Vista institucional
 │   ├── login/              → Autenticación
 │   ├── register/           → Registro
 │   ├── guards/             → authGuard / adminGuard
 │   ├── layout/             → Layout principal con sidenav
 │   ├── navbar/             → Barra de navegación
 │   └── services/           → Comunicación con API
🔐 Autenticación

Login con JWT

Token almacenado en localStorage

Protección de rutas con authGuard

Protección de panel admin con adminGuard

📚 Funcionalidades principales
👨‍🎓 Estudiante

Ver cursos disponibles

Acceder a lecciones

Marcar lecciones como completadas

Descargar archivos asociados

Visualizar barra de progreso

Acceder a dashboard personal

👨‍💼 Administrador

Crear / editar / eliminar cursos

Crear / eliminar lecciones

Subir archivos a Cloudinary

Eliminar archivos

Gestión completa del contenido académico

☁️ Integraciones

Backend: ASP.NET Core Web API

Base de datos: PostgreSQL (Neon)

Storage de archivos: Cloudinary

Deploy: Render

🎨 UX & UI

Diseño responsive

Vista institucional “Cómo funciona”

Home inteligente (detecta sesión activa)

Cards modernas para cursos y lecciones

Barra de progreso animada

Panel admin optimizado para mobile

⚙️ Instalación local
1️⃣ Clonar el repositorio
git clone https://github.com/tuusuario/edusync-frontend.git
cd edusync-frontend
2️⃣ Instalar dependencias
npm install
3️⃣ Ejecutar en modo desarrollo
ng serve

Abrir:

http://localhost:4200
🏗️ Build de producción
ng build --configuration production

El resultado se genera en:

dist/
🧪 Testing
ng test
📈 Próximas mejoras

Animaciones avanzadas

Certificados descargables en PDF

Modo oscuro global

Sistema de notificaciones

Gestión de instructores

👨‍💻 Autor

Desarrollado por Gabriel Fernando Correa
Proyecto orientado a portfolio Full Stack.




