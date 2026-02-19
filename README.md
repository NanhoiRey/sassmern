1. Estructura general del proyecto
Código
sassmern/
│
├── auth-service/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.ts
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   └── authController.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   └── tokenService.ts
│   │   ├── models/
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   └── authRoutes.ts
│   │   ├── middleware/
│   │   ├── app.ts
│   │   └── server.ts
│   └── .env
│
├── user-service/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.ts
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   └── userController.ts
│   │   ├── middleware/
│   │   │   └── requireAuth.ts
│   │   ├── models/
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   └── userRoutes.ts
│   │   ├── app.ts
│   │   └── server.ts
│   └── .env
│
└── README.md
🔐 2. Auth Service — Qué hace cada archivo
📄 config/env.ts
Carga variables de entorno y expone configuración:

Puerto

URI de Mongo

Secretos JWT

Expiraciones

Dominio de cookies

📄 config/db.ts
Conecta a MongoDB usando env.mongoUri.

📄 models/User.ts
Modelo de usuario para autenticación:

email

password hash

role

timestamps

📄 services/authService.ts
Lógica de negocio:

createUser() → crea usuario en Auth

validateUser() → valida email + password

📄 services/tokenService.ts
Genera y valida tokens:

generateTokens()

verifyRefreshToken()

📄 controllers/authController.ts
Controlador principal:

register()

crea usuario

sincroniza con Users Service

genera tokens

devuelve accessToken

login()

refresh()

logout()

📄 routes/authRoutes.ts
Define rutas:

/auth/register

/auth/login

/auth/refresh

/auth/logout

📄 app.ts y server.ts
Configura middlewares, rutas y arranca el servidor.

👤 3. Users Service — Qué hace cada archivo
📄 config/env.ts
Carga puerto y URI de Mongo.

📄 config/db.ts
Conecta a taskflow_users.

📄 models/User.ts
Modelo de usuario del Users Service:

email

role

name

avatar

timestamps

📄 middleware/requireAuth.ts
Valida JWT:

Lee Authorization: Bearer <token>

Verifica token

Inserta req.user = { id, email, role }

📄 controllers/userController.ts
createUserSync
Recibe datos desde Auth Service:

Si el usuario no existe → lo crea

Si existe → lo devuelve

getMe
Devuelve el usuario autenticado.

updateMe
Actualiza name y avatar.

📄 routes/userRoutes.ts
Define rutas:

POST /users/sync

GET /users/me

PUT /users/me

📄 app.ts y server.ts
Configura middlewares, rutas y arranca el servidor.

🔄 4. Flujo completo que ya funciona
🟦 1. Registro
Cliente → Auth Service:

Código
POST /auth/register
Auth Service:

Crea usuario en su base

Llama a Users Service:

Código
POST http://localhost:4002/users/sync
Users Service guarda el usuario

Auth Service devuelve tokens

🟩 2. Obtener perfil
Cliente → Users Service:

Código
GET /users/me
Authorization: Bearer <token>
Users Service:

Valida token

Busca usuario en taskflow_users

Devuelve perfil

🟧 3. Actualizar perfil
Cliente → Users Service:

Código
PUT /users/me
Authorization: Bearer <token>
Body:

json
{
  "name": "Nanhoi",
  "avatar": "https://mi-avatar.com/foto.png"
}
Users Service:

Valida token

Actualiza documento

Devuelve usuario actualizado

⭐ 5. Qué fue lo último que se arregló
🔥 Problema:
Users Service no recibía la sincronización desde Auth Service.

🔍 Causa real:
Uno de los servicios no estaba corriendo o estaba desincronizado.

🛠️ Acción que lo reveló:
Agregamos:

ts
console.log("SYNC BODY:", req.body);
Esto permitió ver que:

Auth Service sí estaba enviando la petición

Users Service sí la estaba recibiendo

MongoDB sí estaba guardando el usuario

🎉 Resultado:
La sincronización Auth → Users quedó funcionando.
