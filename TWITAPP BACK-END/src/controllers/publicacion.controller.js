'use strict'

const Publicacion = require('../models/publicacion.model');
const User = require('../models/user.model');

//Crear Publicación
const createPublicar = async(req, res) => {
    try{
        const usuarioId = req.params.IdUser; // Obtener el ID del usuario de los parámetros de la URL
        const { imagen, texto, likes, dislikes } = req.body; // Obtener los datos de imagen, texto, likes y dislikes del cuerpo de la solicitud
    
        // Crear la nueva publicación
        const nuevaPublicacion = new Publicacion({
          imagen,
          texto,
          likes,
          dislikes
        });
    
        // Guardar la publicación en la base de datos
        const publicacionGuardada = await nuevaPublicacion.save();
    
        // Obtener el ID de la publicación guardada
        const publicacionId = publicacionGuardada._id;
    
        // Actualizar el array de publicaciones del usuario
        const usuario = await User.findByIdAndUpdate(
          usuarioId,
          { $push: { publicaciones: publicacionId } },
          { new: true }
        );
    
        // Obtener los datos completos de la publicación con los likes y dislikes
        const publicacionCompleta = await Publicacion.findById(publicacionId);
    
        res.status(201).json({
          message: 'Publicación creada exitosamente',
          publicacion: publicacionCompleta
        });

    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'No se pudo realizar la publicación',
            error: error,
        })
    }
}

//Listar Publicación
const readPublicaciones = async(req, res) => {
  try {
    // Obtener todas las publicaciones de la base de datos
    const publicaciones = await Publicacion.find();

    res.status(200).json({
      message: 'Publicaciones obtenidas exitosamente',
      publicaciones: publicaciones
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'No se pudo obtener las publicaciones',
      error: error
    });
  }
}

//Eliminar Publicación
const deletePublicacion = async (req, res) => {
  try {
    const userId = req.params.IdUser;

    // Verificar si la publicación existe
    const publicacion = await Publicacion.findOne({ _id: req.params.publicacionId, userId });
    if (!publicacion) {
      return res.status(404).json({
        message: 'La publicación no existe o no tienes permiso para eliminarla.',
        ok: false,
      });
    }

    // Si existe la publicación y coincide con el usuario, procedemos a eliminarla
    await Publicacion.findByIdAndDelete(req.params.publicacionId);

    return res.status(200).json({
      message: 'La publicación ha sido eliminada correctamente.',
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Ha ocurrido un error al eliminar la publicación.',
      ok: false,
      error: error.message,
    });
  }
};

module.exports = {  createPublicar,
                    readPublicaciones,
                    deletePublicacion }