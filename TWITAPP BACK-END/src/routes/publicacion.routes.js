'use strict'

const { Router } = require('express');
const { createPublicar, readPublicaciones, deletePublicacion } = require('../controllers/publicacion.controller');

const api = Router();

api.post('/publicacion/:id', createPublicar)

api.get('/read-publicaciones', readPublicaciones)

api.delete('/delete-publicacion/:IdUser/:publicacionId', deletePublicacion)

module.exports = api;