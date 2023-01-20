# Backend Node - Calendar App
   Instalacion General
   ```
   npm i express express-validator dotenv mongoose bcryptjs jsonwebtoken cors
   ```
1. Iniciar proyecto
   * `npm init -y`
2. Instalar [Nodemon](https://www.npmjs.com/package/nodemon) como administrador para correr proyecto
   * `npm install nodemon -g`
3. Crear archivo `index.js`
4. Modificar scripts de package.json
   * "scripts": { 
        "dev": "nodemon index.js",
        "start": "node index.js" 
    }
5. Levantar proyecto
   * `npm run dev`
6. Instalacion de [express](https://www.npmjs.com/package/express)
   * `npm i express`
7. Para que el backend lea las variables de entorno
   * `npm i dotenv`
8. Validar entradas con [express-validator](https://www.npmjs.com/package/express-validator)
   * `npm i express-validator`
9. Instalacion de database [Mongoose](https://mongoosejs.com/)
   * `npm i mongoose`
10. Instalar paquete para encryptar contraseñas
    * `npm i bcryptjs`
11. Instalar [JSON Web Tokens](https://jwt.io/)
    * `npm i jsonwebtoken`
12. Instalar [Coors](https://www.npmjs.com/package/cors)
    * `npm i cors`
13. Validar Fechas Instalar Moment
    * `npm i moment`

# HTTP Status Code
[Codigos de Error para peticiones HTTP](https://www.restapitutorial.com/httpstatuscodes.html)

# Base de datos Mongo DB Atlas
https://www.mongodb.com/es/cloud/atlas/efficiency<br>
[Descarga Directa MongoDb Compass 1.30.1](https://downloads.mongodb.com/compass/mongodb-compass-1.30.1-win32-x64.zip)<br>
https://mongoosejs.com/