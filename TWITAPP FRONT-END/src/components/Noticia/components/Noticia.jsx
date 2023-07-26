import { useState, useEffect } from "react";
import axios from "axios";
import "../style/Noticia.css";

const API_KEY = "26ef3118fb194529a263bf28f36868cc";

export const Noticia = () => {
  const [news, setNews] = useState([]);

  // Función para obtener noticias aleatorias
  const fetchNews = async () => {
    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          country: "us",
          apiKey: API_KEY,
        },
      });

      // Obtener 3 noticias aleatorias
      const randomIndices = getRandomIndices(response.data.articles, 3);
      const randomNews = randomIndices.map(
        (index) => response.data.articles[index]
      );
      setNews(randomNews);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // Función para obtener 'count' índices aleatorios de una lista
  const getRandomIndices = (list, count) => {
    const shuffled = list
      .map((item, index) => ({ item, index }))
      .sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(({ index }) => index);
  };

  // Cargar noticias automáticamente al montar el componente
  useEffect(() => {
    fetchNews();
  }, []);

  // Función para cargar noticias adicionales
  const handleLoadMore = () => {
    fetchNews();
  };

  return (
    <div className="container mt-5">
      <div className="title-container">
        <h1 className="mb-4">Noticias internacionales</h1>
        <button className="btn btn-primary mb-3" onClick={handleLoadMore}>
          Cargar Noticias
        </button>
      </div>
      <div className="row">
        {news.map((article) => (
          <div key={article.url} className="col-md-4 mb-4">
            <div className="card">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  className="card-img-top"
                  alt={article.title}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Leer más
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Noticia;
