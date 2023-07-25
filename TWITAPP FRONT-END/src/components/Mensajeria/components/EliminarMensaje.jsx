import React, { useState } from 'react';
import axios from 'axios';

const EliminarMensaje = () => {
  const [mensajeId, setMensajeId] = useState('');

  const eliminarMensaje = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del usuario desde el almacenamiento local
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Pasar el token como encabezado de autorización
        },
      };

      const response = await axios.delete(
        `http://localhost:3005/api/deleteMessage/${mensajeId}`,
        config
      );

      console.log(response.data); // Mostrar la respuesta del backend (opcional)
    } catch (error) {
      console.error('Error al eliminar el mensaje:', error);
    }
  };

  return (
    <div>
      <h2>Eliminar Mensaje</h2>
      <div>
        <input
          type="text"
          placeholder="ID del mensaje a eliminar"
          value={mensajeId}
          onChange={(e) => setMensajeId(e.target.value)}
        />
        <button onClick={eliminarMensaje}>Eliminar</button>
      </div>
    </div>
  );
};

export default EliminarMensaje;
