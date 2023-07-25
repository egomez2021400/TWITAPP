import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "AIzaSyBIMeZrMptZxIbbpDQnybzAJlczOq7AOh0";
const API_URL = "https://www.googleapis.com/youtube/v3/search";

export const Live = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          key: API_KEY,
          part: "snippet",
          q: searchTerm,
          type: "video",
          maxResults: 12,
        },
      });

      setSearchResults(response.data.items);
    } catch (error) {
      console.error("Error searching videos:", error);
    }
  };

  // Función para obtener videos recomendados
  const getRecommendedVideos = async () => {
    try {
      // Realiza una solicitud a la API de YouTube para obtener videos recomendados
      const response = await axios.get(API_URL, {
        params: {
          key: API_KEY,
          part: "snippet",
          chart: "mostPopular", // Utiliza "mostPopular" para obtener los videos más populares
          type: "video",
          maxResults: 12,
        },
      });

      return response.data.items;
    } catch (error) {
      console.error("Error fetching recommended videos:", error);
      return []; // En caso de error, regresa una lista vacía
    }
  };

  // Función para cargar videos recomendados
  const loadRecommendedVideos = async () => {
    try {
      const recommendedVideos = await getRecommendedVideos();
      setSearchResults(recommendedVideos);
    } catch (error) {
      console.error("Error loading recommended videos:", error);
    }
  };

  useEffect(() => {
    // Cargar videos recomendados al montar el componente
    loadRecommendedVideos();
  }, []); // El array vacío asegura que solo se carguen al montar

  return (
    <div className="container mt-3">
      <h1>Buscador de Youtube</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control Buscador"
          placeholder="Busca un video..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="row">
        {searchResults.map((video) => (
          <div key={video.id.videoId} className="col-md-4 mb-4">
            <div className="card88">
              <img
                src={video.snippet.thumbnails.medium.url}
                className="card-img-top"
                alt={video.snippet.title}
              />
              <div className="card-body90">
                <h5 className="card-title65">{video.snippet.title}</h5>
                <p className="card-text45">{video.snippet.description}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Ver Video
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Live;
