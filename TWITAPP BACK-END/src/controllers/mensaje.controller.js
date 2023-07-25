'use strict'

const User = require('../models/user.model');
const Message = require('../models/mensaje.model');

//Enviar Mensaje
const sendMessage = async (req, res) => {
  try {
    const { IdUserReceptor, texto } = req.body; // ID del usuario receptor y el texto del mensaje desde el cuerpo
    const IdUser = req.user.id; // ID del usuario emisor obtenido desde el token (pasado por el middleware)

    // Comprobamos si ambos usuarios existen antes de enviar el mensaje
    const emisor = await User.findById(IdUser);
    const receptor = await User.findById(IdUserReceptor);

    if (!emisor || !receptor) {
      return res.status(404).json({
        message: 'El usuario emisor o receptor no existe.',
        ok: false,
      });
    }

    // Creamos el mensaje
    const mensaje = new Message({
      emisor: emisor._id,
      receptor: receptor._id,
      texto,
    });

    // Guardamos el mensaje en la base de datos
    await mensaje.save();

    // Agregamos el mensaje tanto en los mensajes enviados como recibidos de los usuarios
    emisor.mensajesEnviados.push(mensaje._id);
    receptor.mensajesRecibidos.push(mensaje._id);
    await emisor.save();
    await receptor.save();

    return res.status(200).json({
      message: 'Mensaje enviado correctamente.',
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Ha ocurrido un error al enviar el mensaje',
      ok: false,
      error: error.message,
    });
  }
};

//Listar Mensajes
const listMessages = async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario obtenido desde el token (pasado por el middleware)

    // Buscamos los mensajes donde el usuario sea el emisor o el receptor
    const mensajes = await Message.find({
      $or: [{ emisor: userId }, { receptor: userId }],
    }).populate('emisor receptor', 'name nombre apellido'); // Solo mostramos el nombre, apellido y name de los usuarios

    return res.status(200).json({
      mensajes,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Ha ocurrido un error al listar los mensajes',
      ok: false,
      error: error.message,
    });
  }
};

//Eliminar Mensaje
const deleteMessage = async (req, res) => {
  try {
    const mensajeId = req.params.IdMensaje;

    // Verificar si el mensaje existe
    const mensaje = await Message.findById(mensajeId);
    if (!mensaje) {
      return res.status(404).json({
        message: 'El mensaje no existe.',
        ok: false,
      });
    }

    // Buscar el usuario emisor del mensaje
    const emisor = await User.findById(mensaje.emisor);
    if (!emisor) {
      return res.status(404).json({
        message: 'El usuario emisor del mensaje no existe.',
        ok: false,
      });
    }

    // Buscar el usuario receptor del mensaje
    const receptor = await User.findById(mensaje.receptor);
    if (!receptor) {
      return res.status(404).json({
        message: 'El usuario receptor del mensaje no existe.',
        ok: false,
      });
    }

    // Eliminar el mensaje de la base de datos
    await Message.findByIdAndDelete(mensajeId);

    // Eliminar el mensaje de los arrays mensajesEnviados y mensajesRecibidos de los usuarios involucrados
    emisor.mensajesEnviados = emisor.mensajesEnviados.filter(
      (msgId) => msgId.toString() !== mensajeId
    );
    receptor.mensajesRecibidos = receptor.mensajesRecibidos.filter(
      (msgId) => msgId.toString() !== mensajeId
    );

    await emisor.save();
    await receptor.save();

    return res.status(200).json({
      message: 'El mensaje ha sido eliminado correctamente.',
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Ha ocurrido un error al eliminar el mensaje.',
      ok: false,
      error: error.message,
    });
  }
};

module.exports = {  sendMessage,
                    listMessages,
                    deleteMessage}