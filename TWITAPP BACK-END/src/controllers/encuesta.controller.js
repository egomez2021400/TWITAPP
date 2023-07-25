'use strict'

const User = require('../models/user.model');
const Encuesta = require('../models/encuesta.model');

// Crear Encuestas
const createEncuesta = async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario obtenido desde el token JWT
    const { pregunta, likes, dislikes } = req.body;

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'El usuario no existe.',
        ok: false,
      });
    }

    // Crear la encuesta
    const encuesta = new Encuesta({
      user: user._id,
      pregunta,
      likes,
      dislikes,
    });

    // Guardar la encuesta en la base de datos
    await encuesta.save();

    // Agregar la referencia de la encuesta al array encuestas del usuario
    user.encuestas.push(encuesta._id);
    await user.save();

    return res.status(201).json({
      message: 'Encuesta creada exitosamente.',
      encuesta,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Ha ocurrido un error al crear la encuesta.',
      ok: false,
      error: error.message,
    });
  }
};

//Listar Encuestas
const listEncuestas = async (req, res) => {
    try {
      // Buscar todas las encuestas en la base de datos y cargar solo el campo "name" del usuario que la creó
      const encuestas = await Encuesta.find().populate('user', 'name');
  
      return res.status(200).json({
        encuestas,
        ok: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ha ocurrido un error al listar las encuestas.',
        ok: false,
        error: error.message,
      });
    }
};
 
//Eliminar Encuestas
const deleteEncuesta = async (req, res) => {
  try {
    const userId = req.user.id; // Obtener el ID del usuario desde el token JWT
    const encuestaId = req.params.IdEncuesta;

    // Verificar si la encuesta existe y si pertenece al usuario
    const encuesta = await Encuesta.findOne({ _id: encuestaId, user: userId });
    if (!encuesta) {
      return res.status(404).json({
        message: 'La encuesta no existe o no pertenece al usuario.',
        ok: false,
      });
    }

    // Eliminar la encuesta de la base de datos
    await Encuesta.findByIdAndDelete(encuestaId);

    // Eliminar la referencia de la encuesta en el array encuestas del usuario
    const user = await User.findById(userId);
    user.encuestas = user.encuestas.filter(
      (encId) => encId.toString() !== encuestaId
    );
    await user.save();

    return res.status(200).json({
      message: 'La encuesta ha sido eliminada correctamente.',
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Ha ocurrido un error al eliminar la encuesta.',
      ok: false,
      error: error.message,
    });
  }
};

module.exports = {  createEncuesta,
                    listEncuestas,
                    deleteEncuesta}