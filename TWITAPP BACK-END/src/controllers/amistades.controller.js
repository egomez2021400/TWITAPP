'use strict'

const Usuario = require('../models/user.model');
const Amistad = require('../models/amistades.model');
const { generateJWT } = require('../helpers/create-jwt');

//Agregar Amistades
const addAmis = async (req, res) => {
  try {
    const usuario = req.user.id; // Obtener el ID del usuario logeado desde el token
    const amigo = req.params.id; // Obtener el ID del amigo desde los parámetros de la ruta

    const amistades = await Amistad.findOne({ usuario });

    if (!amistades) {
      const nuevaAmistades = new Amistad({
        usuario,
        amigos: [amigo]
      });
      await nuevaAmistades.save();
    } else {
      if (!amistades.amigos.includes(amigo)) {
        amistades.amigos.push(amigo);
        await amistades.save();
      } else {
        return res.json({ message: 'El amigo ya está en la lista de amigos.' });
      }
    }

    // Obtener los datos del amigo
    const amigoData = await Usuario.findById(amigo);

    // Mostrar los datos del amigo
    const { imagen, name, apellido } = amigoData;

    res.json({
      message: 'Amigo agregado exitosamente',
      amigo: {
        imagen,
        name,
        apellido
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'No se pudo agregar amistad.'
    });
  }
};

//Listar Amistades
// Controlador para listar amistades
const readAmis = async (req, res) => {
  try {
    const amistades = await Amistad.findOne({ usuario: req.user.id }).populate('amigos', 'name email rol');

    if (!amistades) {
      return res.status(404).json({ message: 'No se encontraron amistades.' });
    }

    // Devolver la lista de amigos dentro de un objeto con la clave "amigo"
    res.json({ amigo: amistades.amigos });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'No se pudieron obtener las amistades.'
    });
  }
};

  
module.exports = {  readAmis,
                    addAmis}