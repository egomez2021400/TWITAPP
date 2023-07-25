'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    imagen: {
        type: String
    },
    name: {
        type: String
    },
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    genero: {
        type: String,
        String: ['Masculino', 'Femenino'],
    },
    edad: {
        type: String
    },
    direccion: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    rol: {
        type: String,
        enum: ['ADMIN', 'USUARIO'],
        require: false
    },
    seUnioATwiTapp: {
        type: Date
    },
    Amistades: [{
        type: Schema.Types.ObjectId, ref: 'Amistades',
    }],
    publicaciones: [{
        type: Schema.Types.ObjectId, ref: 'Publicaciones',
    }],
    encuestas: [{
        type: Schema.Types.ObjectId, ref: "Encuesta"
    }],
    mensajesEnviados: [{
        type: Schema.Types.ObjectId, ref: 'Message'
    }],
    mensajesRecibidos: [{
        type: Schema.Types.ObjectId, ref: 'Message',
    }]
});

module.exports = mongoose.model('User', userSchema);