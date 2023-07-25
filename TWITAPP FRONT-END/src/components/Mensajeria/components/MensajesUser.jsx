import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnviarMensaje = ({ usuario, enviarMensaje }) => {
  const [mensaje, setMensaje] = useState('');
  const [mensajesEnviados, setMensajesEnviados] = useState([]);

  const obtenerMensajesEnviados = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del usuario desde el almacenamiento local
      const config = {
        headers: {
          "x-token": token, // Pasar el token como encabezado de autorización
        },
      };

      const response = await axios.get(
        `http://localhost:3005/api/listMessage/`,
        config
      );

      setMensajesEnviados(response.data.mensajes);
    } catch (error) {
      console.error('Error al obtener los mensajes enviados:', error);
    }
  };

  useEffect(() => {
    obtenerMensajesEnviados();
  }, []);

  const enviarMensajeHandler = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del usuario desde el almacenamiento local
      const config = {
        headers: {
          "x-token": token, // Pasar el token como encabezado de autorización
        },
      };

      const body = { IdUserReceptor: usuario._id, texto: mensaje };

      const response = await axios.post(
        'http://localhost:3005/api/message',
        body,
        config
      );
      console.log(response.data); // Mostrar la respuesta del backend (opcional)
      enviarMensaje(); // Cerrar el formulario después de enviar el mensaje
      setMensaje(''); // Limpiar el campo de mensaje después de enviarlo
      obtenerMensajesEnviados(); // Actualizar la lista de mensajes enviados
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Enviar Mensaje a {usuario.name}</h1>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Ingrese su mensaje aquí</h5>
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Escriba su mensaje aquí..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button className="btn btn-primary" onClick={enviarMensajeHandler}>
            Enviar
          </button>
        </div>
      </div>

      <h2>Mensajes Enviados</h2>
      {mensajesEnviados.map((mensaje) => (
        <div key={mensaje._id} className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Mensaje a {usuario.name}</h5>
            <p className="card-text">{mensaje.texto}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnviarMensaje;