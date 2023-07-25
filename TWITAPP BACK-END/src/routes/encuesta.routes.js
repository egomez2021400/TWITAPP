'use strict'

const { Router } = require('express');
const { check } = require('express-validator');
const { validateParams } = require('../middlewares/validate-params');
const { validateJWT } = require('../middlewares/validate-jwt');
const { createEncuesta, listEncuestas, deleteEncuesta } = require('../controllers/encuesta.controller');

const api = Router();

api.post('/Addencuesta', validateJWT, createEncuesta);

api.get('/encuesta', listEncuestas);

api.delete('/deleteEncuesta/:IdEncuesta', validateJWT, deleteEncuesta)

module.exports = api;