# Backend – Autenticación y Gestión de Solicitudes  
**Node.js + Express + JWT + GitHub OAuth + SSR (EJS)**

Este proyecto corresponde al **backend** de una aplicación web que implementa:

- Sistema completo de **autenticación de usuarios**
- **Gestión de solicitudes de viaje**
- **Renderizado del lado del servidor (SSR)** mediante **EJS**
- Consumo desde un frontend desarrollado en **React (SPA)**

El backend expone **APIs REST** y además **vistas SSR**, permitiendo demostrar la convivencia entre **SPA y SSR** en un mismo proyecto, cumpliendo los requisitos académicos del ejercicio.

---

## 🛠️ Tecnologías utilizadas

- Node.js  
- Express.js  
- JSON Web Tokens (JWT)  
- bcrypt  
- dotenv  
- cors  
- helmet  
- morgan  
- uuid  
- EJS (Server-Side Rendering)  

---

## ⚙️ Configuración del entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
PORT=3001
JWT_SECRET=jwt_secret_key

GITHUB_CLIENT_ID=tu_client_id
GITHUB_CLIENT_SECRET=tu_client_secret
GITHUB_REDIRECT_URI=http://localhost:5173/auth/github/callback
```

---

## 📦 Instalación de dependencias

```
npm install
```

---

## ▶️ Ejecución del servidor

```
npm run dev
```

Servidor disponible en:

```
http://localhost:3001
```

---

## 📌 Funcionalidades implementadas

### ✔ Autenticación de usuarios
- Registro con email y contraseña  
- Inicio de sesión tradicional  
- Inicio de sesión mediante **GitHub OAuth 2.0**  
- Generación y validación de **JWT**  
- Protección de rutas privadas  
- Cierre de sesión desde el frontend  

---

### ✔ Gestión de solicitudes de viaje
- Registro de solicitudes personalizadas  
- Validación de campos obligatorios  
- Validación de formato de correo electrónico  
- Listado completo de solicitudes  
- Persistencia de datos simulada  

---

### ✔ Server-Side Rendering (SSR)
- Renderizado de vistas mediante **EJS**
- Listado de solicitudes generado en el servidor
- Acceso directo vía navegador sin SPA
- Integración completa con la API backend

---

## 🔐 Autenticación con JWT

Las rutas protegidas requieren el siguiente header:

```
Authorization: Bearer <token>
```

---

## 📡 Endpoints disponibles

### 🔸 Registro de usuario
POST `/api/auth/register`

```
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

---

### 🔸 Login de usuario
POST `/api/auth/login`

```
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

---

### 🔸 Login con GitHub
POST `/api/auth/github`

```
{
  "code": "codigo_de_autorizacion_github"
}
```

---

### 🔸 Usuario autenticado
GET `/api/auth/me`

---

### 🔸 Crear solicitud de viaje
POST `/api/solicitudes`

---

### 🔸 Listar solicitudes (API)
GET `/api/solicitudes`

---

### 🔸 Listar solicitudes (SSR)
GET `/api/solicitudes/ssr`

Renderiza una vista HTML usando **EJS**, mostrando todas las solicitudes registradas.

---

## 🧪 Persistencia simulada

- Usuarios almacenados en:
```
  data/users.json
```

- Solicitudes almacenadas de forma simulada en el servidor

No se utilizan bases de datos externas.
