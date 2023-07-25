import { CreateUser } from "../utils/UserApi";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import * as Yup from "yup";

export const formSchema = Yup.object().shape({
    name: Yup.string().required("El nombre de usuario es requerido"),
    email: Yup.string().required("El correo es requerido").email("Debe ser un correo electronico valido"),
    password: Yup.string().required("Se requiere de contraseña").min(6, "Debe tener al menos 6 caracteres")
});

export const formOptions = { resolver: yupResolver(formSchema) };

export const sendData = async (user, option) => {
    let resultado;
    switch (option) {
        case 1:
        resultado = await CreateUser(
            user.name,
            user.email,
            user.password,
            user.rol,
            user.nombre,
            user.apellido,
            user.edad
        );
        if (resultado) {
            Swal.fire({
            icon: "success",
            title: "Genial",
            text: "Usuario creado correctamente!",
            showConfirmButton: true, // "showConfirmButton" en lugar de "showConfirmButtom"
            confirmButtonText: "Ok", // "confirmButtonText" en lugar de "confirmButtomText"
            }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/";
            } else {
                window.location.href = "/";
            }
            });
            }
            break;
        default:
        
    }
};

