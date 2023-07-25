'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = Schema({
    emisor: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    receptor: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    texto: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', messageSchema);