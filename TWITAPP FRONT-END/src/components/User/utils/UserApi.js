import axios from "axios";
import Swal from "sweetalert2";
const URL = "http://localhost:3005/api/";
const token = localStorage.getItem("token");

//Crea el usuario con método post
export const CreateUser = async (name, email, password, rol, nombre, apellido, edad) => {
  try {
    await axios.post(
      `${URL}create-user`,
      {
        name: name,
        email: email,
        password: password,
        rol: rol,
        nombre: nombre,
        apellido: apellido,
        edad: edad
      },
      {
        headers: { "x-token": token },
      }
    );
    return true;
  } catch ({
    response: {
      data: { message },
    },
  }) {
    if (message === "El token ha expirado") {
      Swal.fire({
        icon: "error",
        tittle: "Oops...",
        text: message,
        showConfirmButtom: true,
        confirmButtomText: "ok",
      }).then((result) => {
        if (result.isComfirmed) {
          localStorage.removeItem("token");
          window.location.href = "/registrar";
        } else {
          localStorage.removeItem("token");
          window.location.href = "/registrar";
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        tittle: "Oops...",
        text: message,
        confirmButtomText: "ok",
      });
    }
  }
};


export const DeleteUser = async (id, token) => {
  try {
    const { data } = await axios.delete(`${URL}delete-user/${id}`, {
      headers: { "x-token": token },
    });
    return data;
  } catch (error) {
    const message = error?.response?.data?.message;
    if (message === "el token ha expirado") {
      window.location.href = "/login";
      localStorage.removeItem("token");

      
    }
    return message || null;
  }
};
