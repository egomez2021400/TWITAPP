'use strict'

const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require("cors");
const { connection } = require('./src/database/connection');
const user = require('./src/routes/user.routes');
const amistades = require('./src/routes/amistades.routes');
const publicacion = require('./src/routes/publicacion.routes');
const message = require('./src/routes/mensaje.routes');
const encuesta = require('./src/routes/encuesta.routes');

connection();

app.use(express.urlencoded({extended: false}));

app.use(express.json());
app.use(cors());
app.use('/api', user,
                amistades,
                publicacion,
                message,
                encuesta);

app.listen(port, () => {
    console.log(`The server is connected to the port ${port}`)
})