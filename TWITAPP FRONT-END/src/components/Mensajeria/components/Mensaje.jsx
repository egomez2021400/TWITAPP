import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EnviarMensaje from './MensajesUser.jsx'; // Importamos el componente

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    // Función para obtener la lista completa de usuarios desde el backend
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/read-user');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  const mostrarMensajeHandler = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarMensaje(true);
  };

  const enviarMensajeHandler = (usuario, mensaje) => {
    // Aquí puedes implementar la lógica para enviar el mensaje al backend
    console.log('Mensaje:', mensaje);
  };

  // Función para filtrar usuarios por nombre según la búsqueda
  const filtrarUsuarios = (usuarios, busqueda) => {
    if (!busqueda) {
      return usuarios;
    }

    return usuarios.filter((usuario) =>
      usuario.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  };

  const usuariosFiltrados = filtrarUsuarios(usuarios, busqueda);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar usuario por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          {usuariosFiltrados.map((usuario) => (
            <div key={usuario._id} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <h5 className="card-title">{usuario.name}</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => mostrarMensajeHandler(usuario)}
                >
                  Enviar Mensaje
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-6">
          {mostrarMensaje && usuarioSeleccionado && (
            <EnviarMensaje
              usuario={usuarioSeleccionado}
              enviarMensaje={enviarMensajeHandler}
            />
          )}
          {mostrarMensaje && !usuarioSeleccionado && (
            <div className="alert alert-info mt-3">
              Seleccione un usuario para enviar un mensaje.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaUsuarios;