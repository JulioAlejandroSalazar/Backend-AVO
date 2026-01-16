# Backend – Autenticación de Usuarios (Node.js + Express + JWT)

Este proyecto corresponde al **backend** de un sistema de autenticación de usuarios desarrollado con **Node.js y Express.js**, que permite el **registro**, **inicio de sesión** y **verificación de sesión mediante JWT**, almacenando los datos de usuarios de forma local en un archivo `.json`.

El backend está diseñado para ser consumido por una aplicación cliente desarrollada en **React**.

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

---

## ⚙️ Configuración del entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
PORT=3001
JWT_SECRET=jwt_secret_key
```

---

## 📦 Instalación de dependencias

Ejecutar el siguiente comando:

```
npm install
```

---

## ▶️ Ejecución del servidor

Para iniciar el servidor en modo desarrollo:

```
npm run dev
```

El servidor quedará disponible en:

```
http://localhost:3001
```

---

## 📌 Funcionalidades implementadas

### ✔ Registro de usuarios
- Recepción de correo electrónico y contraseña.
- Validación de campos vacíos.
- Validación de formato de email.
- Encriptación de contraseña con bcrypt.
- Almacenamiento local de usuarios en un archivo `.json`.

### ✔ Inicio de sesión
- Validación de credenciales.
- Comparación segura de contraseñas.
- Generación de token de autenticación (JWT).
- Retorno del token al cliente.

### ✔ Verificación de sesión
- Middleware que valida el token enviado en el header `Authorization`.
- Acceso a rutas protegidas solo con token válido.

### ✔ Cierre de sesión
- El cierre de sesión se gestiona desde el cliente eliminando el token almacenado (JWT).

---

## 🔐 Autenticación con JWT

El token debe enviarse en cada solicitud protegida mediante el siguiente header:

```
Authorization: Bearer <token>
```

---

## 📡 Endpoints disponibles

### 🔸 Registro de usuario
**POST** `/api/auth/register`

**Body:**

```
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

---

### 🔸 Login de usuario
**POST** `/api/auth/login`

**Body:**

```
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

**Respuesta exitosa:**

```
{
  "status": "success",
  "data": {
    "token": {
      "token": "jwt_token",
      "user": {
        "id": "uuid",
        "email": "usuario@email.com"
      }
    }
  }
}
```

---

### 🔸 Obtener información del usuario autenticado
**GET** `/api/auth/me`

**Headers:**

```
Authorization: Bearer <token>
```

---

## 🧪 Almacenamiento local

Los usuarios se almacenan localmente en:

```
data/users.json
```

Este enfoque cumple con los requisitos del ejercicio sin utilizar bases de datos externas.

---

## 🔗 Integración con Frontend

Este backend está preparado para ser consumido por una aplicación cliente desarrollada en **React**, permitiendo:

- Registro de usuarios
- Inicio de sesión
- Almacenamiento del token en `localStorage` o `sessionStorage`
- Acceso a vistas protegidas
- Cierre de sesión eliminando el token
