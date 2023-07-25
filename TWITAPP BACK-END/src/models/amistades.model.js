'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const amistadSchema = Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    amigos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Amistades', amistadSchema)