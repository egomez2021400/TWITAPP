'use strict';

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { sendMessage, listMessages, deleteMessage } = require('../controllers/mensaje.controller');

const api = Router();

api.post('/message', validateJWT, sendMessage);

api.get('/listMessage', validateJWT, listMessages);

api.delete('/deleteMessage/:IdMensaje', validateJWT, deleteMessage);

module.exports = api;
