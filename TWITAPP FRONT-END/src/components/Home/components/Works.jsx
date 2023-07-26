import Imagenes from "../../../assets/Imagenes";
import "../styles/Works.css";

const Works = () => {
    return (
        
        <div className="container3">
          <div className="card1">
            <div className="face front">
              <img src={Imagenes.img1} alt="" />
              <h3>About</h3>
            </div>
            <div className="face back">
              <h3>TwittApp</h3>
              <p>
                TwittApp es una aplicación que busca la interacción de personas.
                Nuestro objetivo es poder unir a personas de todo el mundo.
              </p>
              <div className="link">
                <a
                  href="https://wilmerchajon01monr.wixsite.com/twitapp"
                  target="blank"
                >
                  Details
                </a>
              </div>
            </div>
          </div>

          <div className="card1">
            <div className="face front">
              <img src={Imagenes.img2} alt="" />
              <h3>Chats</h3>
            </div>
            <div className="face back back2">
              <h3>Chirchap</h3>
              <p>
                Interacción con todas las personas. Podras publicar con más
                gente y disfrutar.
              </p>
              <div className="link">
                <a
                  href="https://wilmerchajon01monr.wixsite.com/twitapp"
                  target="blank"
                >
                  Details
                </a>
              </div>
            </div>
          </div>

          <div className="card1">
            <div className="face front">
              <img src={Imagenes.img3} alt="" />
              <h3>Hilos</h3>
            </div>
            <div className="face back back3">
              <h3>Hilos</h3>
              <p>
                Nuestro modelo de encuestaa es único. Podras hacer encuestas de
                lo que tú quieras.
              </p>
              <div className="link">
                <a
                  href="https://wilmerchajon01monr.wixsite.com/twitapp"
                  target="blank"
                >
                  Details
                </a>
              </div>
            </div>
          </div>
        </div>
    );
};

export default Works;
