import { useEffect } from "react";
import { getOwnUser } from "../utils/PerfilApi";
import { useState } from "react";
import { DeleteUser } from "../utils/UserApi";
import "../styles/Perfil.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Perfil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getOwnUser(token);
        setUser(result);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUser();
  }, [token]);

  const eliminar = async (id) => {
    try {
      let result = await DeleteUser(id);
      if (result) {
        // Verificar si user es un array antes de usar el método filter
        if (Array.isArray(user)) {
          setUser(user.filter((u) => u._id !== id));
        }
        Swal.fire({
          icon: "warning",
          title: "¡Antención!",
          text: "Esta acción eliminó su cuenta en TwittApp, por lo tanto ahora cierre sesión.",
        }).then((r) => {
          if (r.isConfirmed) {
            navigate("/home");
            
          } else {
            navigate("/home");
            
          }
        });
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Oopss...",
        text: "Hubo un error al eliminar el usuario.",
      });
    }
  };


  return (
    <section className="vh-90" style={{ backgroundColor: "#f4f5f7" }}>
      <div className="container98 py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col2 col-lg-8 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: "1em" }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "15em" }}
                  />
                  <h5>{user?.name}</h5>
                  <p>Nombre: {user?.nombre}</p>
                  <p>Edad: {user?.edad}</p>
                  <p>{user?.email}</p>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-10">
                  <div className="card-body p-2">
                    <div className="row pt-1">
                      <div className="col-6 mb-3 text-end">
                        <button className="btn btn-success">Editar</button>
                        {/* Verificación usando el operador de encadenamiento opcional */}
                      </div>
                      <div className="col-6 mb-3 text-end">
                        <button onClick={()=>(eliminar(user._id))} className="btn btn-success">Eliminar</button>
                        {/* Verificación usando el operador de encadenamiento opcional */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perfil;
