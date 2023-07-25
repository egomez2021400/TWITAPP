'use strict'

const { Router } = require('express');
const { check } = require('express-validator');
const { validateParams } = require('../middlewares/validate-params');
const { validateJWT } = require('../middlewares/validate-jwt');
const { createUser,
        readUser,
        viewOwnUser,
        updateUser,
        deleteUser, 
        loginUser } = require('../controllers/user.controller');

const api = Router();

api.post('/create-user', [
        check('name', 'El name es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').not().isEmpty(),
        check('password', 'El password debe ser igual o mayor a 8 digitos.').isLength({min: 8}),
        validateParams
    ], createUser
);

api.get('/read-user', readUser);

api.put('/update-user/:id', updateUser);

api.delete('/delete-user/:id', [validateParams], deleteUser);

api.post('/login', loginUser);

api.get('/profile', [validateJWT], viewOwnUser);

module.exports = api;