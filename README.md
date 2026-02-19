# Medicore - Tarea Semana 6 Marco Gonzalez

Sistema de gestión de pacientes e historias clínicas desarrollado con **Angular 19** y **.NET 8**.

---

## Tarea Semana 5
Si quiere ver la tarea de la semana 5 puede hacer un 
```bash
git checkout 82ba46abdd09420520c23813cb721c6c61c88077
```

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | Angular 19, Tailwind CSS v4, Lucide Angular |
| Backend | .NET 8, Entity Framework Core |
| Base de datos | MySQL |

---

## Estructura del proyecto

```
clinica-app/
│
├── src/
│   ├── backend/
│   └── frontend/
│
├── .gitignore
└── README.md
```

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v20+
- [Angular CLI](https://angular.io/cli) v19
- [.NET 8 SDK](https://dotnet.microsoft.com/)
- [MySQL](https://www.mysql.com/) v8+
- [Visual Studio 2022](https://visualstudio.microsoft.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

---

## Configuración del Backend

### 1. Configurar la base de datos

Editar el archivo `src/backend/ClinicaAPI/appsettings.json` con las credenciales de MySQL:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=clinica_db;User=root;Password=TU_PASSWORD;"
  }
}
```

### 2. Ejecutar las migraciones

Abrí la **Package Manager Console** en Visual Studio y ejecutá:

```bash
add-migration initial_setup
update-database
```

### 3. Correr la API

Presionar `F5` en Visual Studio. La API estará disponible en `https://localhost:7000`.

---

## Configuración del Frontend

### 1. Instalar dependencias

```bash
cd src/frontend
npm install
```

### 2. Verificar la URL de la API

Revisá que el puerto en los servicios coincida con el de tu API:

```typescript
// src/app/core/services/patient.service.ts
private apiUrl = 'https://localhost:7000/api/pacientes';
```

### 3. Correr el proyecto

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

---

## Funcionalidades

- ✅ Listar pacientes
- ✅ Crear paciente
- ✅ Editar paciente
- ✅ Eliminar paciente con confirmación
- ✅ Ver historias clínicas por paciente
- ✅ Crear historia clínica
- ✅ Eliminar historia clínica con confirmación
