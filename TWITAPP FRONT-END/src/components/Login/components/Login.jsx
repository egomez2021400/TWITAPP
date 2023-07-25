import { useState } from "react";
import Swal from "sweetalert2";
import { login } from "../utils/ApiLogin";
import { Link } from "react-router-dom";
import "../styles/Login.css";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const iniciarSesion = async (e) => {
        e.preventDefault();
        const result = await login(email, password);

        if (result) {
        Swal.fire({
            icon: "success",
            tittle: "Bienvenido a TwittApp 🐥",
            text: "You could login",
            confirmButtonText: "Ok",
        }).then((r) => {
            if (r.isConfirmed) {
            window.location.href = "/home";
            } else {
            window.location.href = "/home";
            }
        });
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center-between align-items-center p-4 m-14">
            <form className="login col-7">
                <img src="https://cdn-icons-png.flaticon.com/128/3256/3256799.png" alt="" className="imaLog"/>
                <div className="mb-3">
                <div className="mb-3">
                    <label className="form-label text-black ">Correo Electrónico</label>
                    <input
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label text-black">Contraseña</label>
                    <input
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                    type="password"
                    className="form-control"
                    id="password"
                    required
                    />
                </div>
                <button
                    type="submit"
                    onClick={(e) => iniciarSesion(e)}
                    className="botLog btn btn-primary"
                >
                    LOGIN
                </button>
                </div>
                
                <Link to="/register">
                    <p>Create account...</p>
                </Link>
                
            </form>
        </div>
    );
};

export default Login;
