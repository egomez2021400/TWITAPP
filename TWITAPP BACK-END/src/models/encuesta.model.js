'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EncuestaSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    pregunta: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
})

module.exports = mongoose.model('Encuesta', EncuestaSchema);