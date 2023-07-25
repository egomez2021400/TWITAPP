'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publiSchema = Schema({
    imagen: {
        type: String
    },
    texto: {
        type: String
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Publicaciones', publiSchema);