## Bancax Backend

### Acerca de
El backend de Bancax es una API REST construida con Node.js y Express.js, que proporciona los servicios necesarios para la aplicación frontend. Utiliza MongoDB como base de datos para almacenar la información de los usuarios, sus transacciones y las configuraciones de la aplicación.

#### Pagina funcional: [Bancax](https://bancax.vercel.app)

### Funcionalidades
* **Autenticación de usuarios:** Implementa un sistema de registro y autenticación seguro utilizando JWT.
* **Gestión de transacciones:** Permite a los usuarios registrar ingresos y gastos, así como consultar el historial de transacciones.
* **Categorías:** Permite a los usuarios crear y gestionar categorías personalizadas para sus gastos.
* **Integración con Cloudinary:** Permite a los usuarios subir y almacenar imágenes de perfil.

### Base de datos MongoDB
La base de datos MongoDB almacena las siguientes colecciones:
* **Usuarios:** Contiene información sobre los usuarios registrados, como el correo electrónico, la contraseña hash, la imagen de perfil y las preferencias.
* **Transacciones:** Almacena el historial de transacciones de los usuarios, incluyendo la fecha, el monto, la categoría y una descripción.
* **Categorías:** Contiene las categorías personalizadas creadas por los usuarios.

### API REST
La API REST expone los siguientes endpoints:
**Usuarios:**
* **GET /users/**: Obtiene todos los usuarios. 
* **GET /users/:user_id**: Obtiene un usuario por su ID. 
* **PUT /users/:user_id**: Actualiza un usuario por su ID. 
* **PUT /users/upload-photo/:user_id**: Sube la foto de perfil de un usuario por su ID. 
* **DELETE /users/:user_id**: Elimina un usuario por su ID. 

**Transacciones:**
* **POST /transactions/:user_id**: Crea una nueva transacción para un usuario específico. 
* **GET /transactions/:user_id**: Obtiene el historial de transacciones de un usuario específico. 

**Autenticación:**
* **GET /auth/verify/:verification_token**: Verifica el token de verificación de correo electrónico. 
* **POST /auth/login**: Inicia sesión de un usuario. 
* **POST /auth/signup**: Registra un nuevo usuario. 
* **PUT /auth/forgot-password**: Solicita el restablecimiento de contraseña. 
* **PUT /auth/reset-password/:token**: Restablece la contraseña de un usuario. 
* **PUT /auth/reset-password/user/:user_id**: Cambia la contraseña de un usuario por su ID. (**NUEVO**)


### Tecnologías utilizadas
* **Node.js:** Entorno de ejecución de JavaScript.
* **Express.js:** Framework web para Node.js.
* **MongoDB:** Base de datos NoSQL.
* **Mongoose:** ODM para MongoDB.
* **Bcrypt:** Para hash de contraseñas.
* **Cloudinary:** Para almacenamiento y gestión de imágenes.
* **JWT:** Para autenticación de usuarios.
* **...**

### Dependencias
| Dependencia | Función |
|---|---|
| bcrypt | Hash de contraseñas |
| cloudinary | Gestión de imágenes |
| cors | CORS middleware |
| dotenv | Gestión de variables de entorno |
| express | Framework web |
| jwt | JSON Web Tokens |
| mongoose | ODM para MongoDB |
| nodemailer | Envío de correos electrónicos |
| validator | Validación de datos |

### Seguridad
Se han implementado las siguientes medidas de seguridad:
* **Hashing de contraseñas:** Las contraseñas se almacenan en la base de datos utilizando bcrypt.
* **JWT:** Se utilizan JWT para autenticar a los usuarios.
* **CORS:** Se configura CORS para permitir solicitudes desde el frontend.
* **Validación de datos:** Se valida toda la entrada del usuario para prevenir ataques de inyección.

### Licencia
Yay! ES GRATIS!
