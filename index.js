require('dotenv').config();

const express = require('express');

const cors = require('cors')

const {dbConnection} = require('./database/config')

// Crear el servidor de express

const app = express();

// Configurar Cors

app.use(cors())

// Lectura y parseo del body

app.use(express.json());

//Base de datos

dbConnection();

//Directorio publico

app.use(express.static('public'));

// Crear rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busqueda'));
app.use('/api/upload', require('./routes/uploads'));

//en vez de poner el numero del puerto uso la variable de entorno del archivo .env

app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto ' + 3000);
});

//password: 2Kku3dR7xk2XWc43
//user: mean_user