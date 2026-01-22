### Backend – Autenticación de Usuarios (Node.js + Express + JWT + GitHub OAuth)

Este proyecto corresponde al **backend** de un sistema de autenticación de usuarios desarrollado con **Node.js y Express.js**, que permite:

- Registro de usuarios con email y contraseña  
- Inicio de sesión tradicional  
- Inicio de sesión mediante **GitHub OAuth 2.0**  
- Verificación de sesión mediante **JSON Web Tokens (JWT)**  

Los datos de los usuarios se almacenan de forma local en un archivo `.json`, cumpliendo los requisitos del ejercicio **sin utilizar bases de datos externas**.  
El backend está diseñado para ser consumido por una aplicación cliente desarrollada en **React**.

---

### 🛠️ Tecnologías utilizadas

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

### ⚙️ Configuración del entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
PORT=3001  
JWT_SECRET=jwt_secret_key  

GITHUB_CLIENT_ID=tu_client_id  
GITHUB_CLIENT_SECRET=tu_client_secret  
GITHUB_REDIRECT_URI=http://localhost:5173/auth/github/callback  
```

---

### 📦 Instalación de dependencias

Ejecutar el siguiente comando:

```
npm install  
```

---

### ▶️ Ejecución del servidor

Para iniciar el servidor en modo desarrollo:

```
npm run dev  
```

El servidor quedará disponible en:

```
http://localhost:3001  
```

---

### 📌 Funcionalidades implementadas

#### ✔ Registro de usuarios (email y contraseña)
- Validación de campos obligatorios  
- Validación de formato de email  
- Encriptación de contraseña con bcrypt  
- Almacenamiento local en archivo `.json`  

#### ✔ Inicio de sesión tradicional
- Validación de credenciales  
- Generación de token JWT  
- Retorno del token al cliente  

#### ✔ Inicio de sesión con GitHub (OAuth 2.0)
- Recepción del `code` desde el frontend  
- Intercambio del código por un `access_token` de GitHub  
- Obtención de información del usuario desde la API de GitHub  
- Creación automática del usuario si no existe  
- Generación de JWT propio del sistema  

#### ✔ Verificación de sesión
- Middleware que valida el token JWT  
- Protección de rutas privadas  

#### ✔ Cierre de sesión
- Gestionado desde el frontend eliminando el token almacenado  

---

### 🔐 Autenticación con JWT

El token debe enviarse en cada solicitud protegida mediante el header:

```
Authorization: Bearer <token>  
```

---

### 📡 Endpoints disponibles

#### 🔸 Registro de usuario
POST `/api/auth/register`

Body:

```
{  
  "email": "usuario@email.com",  
  "password": "123456"  
}  
```

---

#### 🔸 Login de usuario
POST `/api/auth/login`

Body:

```
{  
  "email": "usuario@email.com",  
  "password": "123456"  
}  
```

---

#### 🔸 Login con GitHub
POST `/api/auth/github`

Body:

```  
{  
  "code": "codigo_de_autorizacion_github"  
}  
```

---

#### 🔸 Obtener información del usuario autenticado
GET `/api/auth/me`

Headers:

```
Authorization: Bearer <token>  
```

---

### 🧪 Almacenamiento local

Los usuarios se almacenan en:

```
data/users.json  
```

Este enfoque cumple con los requisitos académicos del proyecto sin utilizar bases de datos externas.

---

### 🔗 Integración con Frontend

Este backend permite:

- Registro de usuarios  
- Inicio de sesión tradicional  
- Inicio de sesión con GitHub  
- Uso de JWT para autenticación  
- Acceso a rutas protegidas  
- Cierre de sesión desde el cliente  
