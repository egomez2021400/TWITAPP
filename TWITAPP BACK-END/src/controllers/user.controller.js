'use strict'

const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/create-jwt');

//Crear usuarios
const createUser = async(req, res) => {
    const { name, email, password } = req.body;
    try{
        let users = await Usuario.findOne({ email: email });

        if(users) {
            return res.status(400).send({
                message: `Un usuario ya usa el email ${email}, intenta con otro.`,
                ok: false,
                users: users,
            })
        }

        users = new Usuario(req.body);

        //Encriptación de contraseña
        const saltos = bcrypt.genSaltSync();
        users.password = bcrypt.hashSync(password, saltos);

        //Subir imagen
        if(req.file) {
            users.imagen = req.file.path; //Asigna la ruta de la imagen al campo "imagen" del usuario
        }

        users = await users.save();

        //Crear token
        const token = await generateJWT(users.id, users.name, users.email);
        res.status(200).send({
            message: `Usuario ${users.name} creado correctamente.`,
            ok: true,
            users,
            token: token,
        });

    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: `No se pudo crear el usuario ${name}`,
            error: error,
        })
    }
}

//Listar usuarios
const readUser = async (req, res) => {
    try {
        const users = await Usuario.find()
            .populate({
                path: 'Amistades',
                populate: {
                    path: 'amigos',
                    select: 'nombre apellido edad' // Seleccionar los campos que deseas mostrar de los amigos
                }
            })
            .populate({
                path: 'publicaciones',
                select: 'imagen texto' // Seleccionar los campos que deseas mostrar de las publicaciones
            })
            //.populate('encuesta'); // Dar información completa de nuestras encuestas.

        res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'No se pudieron obtener los usuarios.'
        });
    }
};

//Editar usuarios
const updateUser = async(req, res) => {
    try{
        const id = req.params.id;
        let editUser = {...req.body};

        //Encriptación de contraseña
        editUser.password = editUser.password
        ? bcrypt.hashSync(editUser.password, bcrypt.genSaltSync())
        : editUser.password

        const userComplete = await Usuario.findByIdAndUpdate(id, editUser, {
            new: true
        });

        if(userComplete) {
            const token = await generateJWT(userComplete.id, userComplete.name, userComplete.email);
            return res.status(200).send({
                message: "Usuario actualizado correctamente",
                userComplete,
                token,
            })
        } else {
            res.status(404).send({
                message: 'Este usuario no existe en la base de datos, o verifique parametros.'
            })
        };

    }catch(error) {
        throw new Error(error)
    }
}

//Eliminar usuario
const deleteUser = async(req, res) => {
    try{
        const id = req.params.id;
        const user = await Usuario.findById(id)

        if(!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        await user.remove();

        res.json({
            message: 'Usuario eliminado correctamente'
        })

    }catch(error) {
        res.status(500).json('Error en el servidor')
        console.log(error)
    }
}

//Ver perfil
const viewOwnUser = async(req, res) => {
    try{
        const idUser = req.user._id;
        
        //Comprobar que el usuario exista
        const user = await Usuario.findById(idUser);
        if(!user) return res.status(404).send({message: 'No se encontro el usuario en la base de datos.'});

        //Retornar el usuario
        return res.status(200).send({message: 'Usuario encontrado.', user});

    }catch(error) {
        
    }
}

//Login 
const loginUser = async(req, res) => {
    const { email, password } = req.body;
    try{
        const usua = await Usuario.findOne({email});

        if(!usua){
            return res.status(404).send({
                ok: false,
                message: 'No se encontro el email'
            })
        };

        const validatePassword = bcrypt.compareSync(
            password,
            usua.password
        );

        if(!validatePassword){
            return res.status(400).send({
                ok: false,
                message: 'Password incorrecto'
            })
        };

        const token = await generateJWT(usua.id, usua.name, usua.email);
        res.json({
            message: `Usuario logeado correctamente, ${usua.name}`,
            ok: true,
            uId: usua.id,
            name: usua.name,
            email: usua.email,
            token: token,
        });

    }catch(error) {
        res.status(500).json({  
            ok: false,
            message: 'Usuario no registrado'
        })
    }
}

module.exports = {  createUser,
                    readUser,
                    updateUser,
                    deleteUser,
                    viewOwnUser,
                    loginUser}