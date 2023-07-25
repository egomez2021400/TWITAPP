import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style/Sidebar.css"

export const Sidebar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/home";
  };

  
  return (
    <div className="sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100">
      <div>
        <li className="d-flex align-items-center">
          <i className="bi bi-twitter fs-5 me-2"></i>
          <span className="fs-4">TwitApp</span>
        </li>

        <hr className="text-secondary mt-2" />

        <ul className="nav nav-pills flex-column p-0 m-0">
          <li className="nav-item p-1">
            <Link to="/" className="nav-link text-white">
              <i className="bi bi-house-fill me-2 fs-5"></i>
              <span className="fs-5">Home</span>
            </Link>
          </li>

          <li className="nav-item p-1">
            <Link to="/chat" className="nav-link text-white">
              <i className="bi bi-wechat me-2 fs-5"></i>
              <span className="fs-5">Chirpchat</span>
            </Link>
          </li>

          <li className="nav-item p-1">
            <Link to="/encuesta" className="nav-link text-white">
              <i className="bi bi-clipboard-data-fill me-2 fs-5"></i>
              <span className="fs-5">Encuesta</span>
            </Link>
          </li>

          <li className="nav-item p-1">
            <Link to="/amigo" className="nav-link text-white">
              <i className="bi bi-chat-left-heart-fill me-2 fs-5"></i>
              <span className="fs-5">Amigos</span>
            </Link>
          </li>

          <li className="nav-item p-1">
            <Link to="/mensaje" className="nav-link text-white">
              <i className="bi bi-envelope-exclamation-fill me-2 fs-5"></i>
              <span className="fs-5">Mensajes</span>
            </Link>
          </li>

          <li className="nav-item p-1">
            <Link to="/noticia" className="nav-link text-white">
              <i className="bi bi-broadcast-pin me-2 fs-5"></i>
              <span className="fs-5">Noticia</span>
            </Link>
          </li>

          <li className="nav-item p-1">
            <Link to="/live" className="nav-link text-white">
              <i className="bi bi-youtube me-2 fs-5"></i>
              <span className="fs-5">Live </span>
            </Link>
          </li>

          
        </ul>
      </div>

      {/* Droptown perfin */}
      <div className="sidebar2">
        <hr className="text-secondary" />

        <div className="dropdown">
          <i className="bi bi-person fs-5 "></i>
          <span
            className="fs-4 dropdown-toggle m-2"
            id="userMenu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Perfil
          </span>

          <ul className="dropdown-menu" aria-labelledby="userMenu">
            <li>
              <Link to="/perfil" className="dropdown-item">
                <b>Perfil</b>
              </Link>
            </li>
            <li>
              <button className="dropdown-item" onClick={logout}>
                Logout 🚀
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
