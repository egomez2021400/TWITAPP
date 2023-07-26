import { useState, useEffect } from "react";
import {
  createPublicacion,
  readPublicaciones,
  deletePublicacion,
} from "../utils/ChirpChat.js";
import "../style/ChirpChat.css";

export const ChirpChat = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [imagen, setImagen] = useState("");
  const [texto, setTexto] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userId, setUserId] = useState("AQUI_EL_ID_DEL_USUARIO");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const cargarPublicaciones = async () => {
    try {
      const response = await readPublicaciones();
      setPublicaciones(response.publicaciones);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const nuevaPublicacion = {
        imagen,
        texto,
        likes,
        dislikes,
      };

      await createPublicacion(userId, nuevaPublicacion);
      cargarPublicaciones();

      setImagen("");
      setTexto("");
      setLikes(0);
      setDislikes(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (publicacionId) => {
    try {
      await deletePublicacion(userId, publicacionId);
      cargarPublicaciones();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = (publicacionId) => {
    const updatedPublicaciones = publicaciones.map((publicacion) => {
      if (publicacion._id === publicacionId) {
        return { ...publicacion, likes: publicacion.likes + 1 };
      }
      return publicacion;
    });
    setPublicaciones(updatedPublicaciones);
  };

  const handleDislike = (publicacionId) => {
    const updatedPublicaciones = publicaciones.map((publicacion) => {
      if (publicacion._id === publicacionId) {
        return { ...publicacion, dislikes: publicacion.dislikes + 1 };
      }
      return publicacion;
    });
    setPublicaciones(updatedPublicaciones);
  };

  const handleReaction = (publicacionId, reactionType) => {
    if (reactionType === "like") {
      handleLike(publicacionId);
    } else if (reactionType === "dislike") {
      handleDislike(publicacionId);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagen(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setTexto(e.target.value);
  };

  const handleSearch = (searchText) => {
    const filteredPublicaciones = publicaciones.filter((publicacion) =>
      publicacion.texto.toLowerCase().includes(searchText.toLowerCase())
    );
    setPublicaciones(filteredPublicaciones);
  };

  const handleButtonClick = () => {
    handleSearch(searchText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchText);
    }
  };

  return (
    <div className="container09 mt-5">
      <form onSubmit={handleSubmit} className="form23">
        {/* Agregar elementos de formulario para crear una nueva publicación */}
        <input type="file" onChange={handleImageChange} />
        <input type="text" value={texto} onChange={handleInputChange} />
        <button className="sub" type="submit">publicar</button>
      </form>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Buscar"
        />
        <button className="sub1" type="button" onClick={handleButtonClick}>
          Buscar
        </button>
      </div>

      {/* Diseño de tarjeta para publicación */}
      <div className="row">
        {publicaciones.map((publicacion) => (
          <div key={publicacion._id} className="col-lg-4 col-md-6 col-sm-12">
            <div className="card34 mt-2">
              <div className="card-body1">
                <h5 className="card-title1">{publicacion.texto}</h5>
                <img src={publicacion.imagen} alt="Publicacion" />
                <div>
                  <button
                    className="btn24 btn-primary mr-2"
                    onClick={() => handleReaction(publicacion._id, "like")}
                  >
                    Like ({publicacion.likes})
                  </button>
                  <button
                    className="btn24 btn-primary"
                    onClick={() => handleReaction(publicacion._id, "dislike")}
                  >
                    Dislike ({publicacion.dislikes})
                  </button>
                </div>
                {userId === publicacion.userId && (
                  <button
                    className="btn12 btn-danger mt-2"
                    onClick={() => handleDelete(publicacion._id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChirpChat;
