import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/style.css';

const EncuestasList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [encuestas, setEncuestas] = useState([]);
  const [encuestasBackup, setEncuestasBackup] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchEncuestas();
  }, []);

  const fetchEncuestas = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/encuesta');
      setEncuestas(response.data.encuestas);
      setEncuestasBackup(response.data.encuestas);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      setEncuestas(encuestasBackup);
      setNoResults(false);
    } else {
      const filteredEncuestas = encuestasBackup.filter((encuesta) =>
        encuesta.pregunta.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setEncuestas(filteredEncuestas);

      if (filteredEncuestas.length > 0) {
        setNoResults(false);
      } else {
        setNoResults(true);
      }
    }
  };

  const handleLikeDislike = (encuestaId, action) => {
    setEncuestas((prevEncuestas) =>
      prevEncuestas.map((encuesta) => {
        if (encuesta._id === encuestaId) {
          if (action === 'addLike') {
            return { ...encuesta, likes: encuesta.likes + 1 };
          } else if (action === 'addDislike') {
            return { ...encuesta, dislikes: encuesta.dislikes + 1 };
          }
        }
        return encuesta;
      })
    );
  };

  return (
    <div className="container86">
      <h2 className="h2T mb-3">Buscar</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control4"
          placeholder="Buscar encuesta..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearchSubmit}
          >
            Buscar
          </button>
        </div>
      </div>
      {noResults && <p className="text-center">No se encontraron resultados</p>}
      <div className="row">
        {encuestas.map((encuesta) => (
          <div key={encuesta._id} className="col-lg-4 col-md-6 mb-4">
            <div className="card07 h-100">
              <div className="card-body50">
                <h4 className="card-title2">Pregunta: {encuesta.pregunta}</h4>
                <p className="card-text6">
                  <strong>Usuario:</strong> {encuesta.user.name}
                  <br />
                  <strong>Likes:</strong> {encuesta.likes || 0}
                  <button
                    className="btn btn-success btn-sm ml-2"
                    onClick={() => handleLikeDislike(encuesta._id, 'addLike')}
                  >
                    Like
                  </button>
                  <strong>Dislikes:</strong> {encuesta.dislikes || 0}
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleLikeDislike(encuesta._id, 'addDislike')}
                  >
                    Dislike
                  </button>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EncuestasList;