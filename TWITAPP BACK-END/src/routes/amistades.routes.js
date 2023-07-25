'use strict'

const { Router } = require('express');
const { check } = require('express-validator');
const { validateParams } = require('../middlewares/validate-params');
const { validateJWT } = require('../middlewares/validate-jwt');
const { readAmis, addAmis } = require('../controllers/amistades.controller');

const api = Router();

api.get('/read-amistades', validateJWT, readAmis);

api.post('/addAmis/:id', validateJWT, addAmis);

module.exports = api;