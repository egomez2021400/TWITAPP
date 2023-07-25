import { useState } from "react";
import { useForm } from "react-hook-form";
import { formOptions, sendData } from "../helper/FormUserHelper";
import PropTypes from "prop-types";
import "../styles/registrar.css"

export const FormCuenta = () => {
    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      rol: "USUARIO",
      nombre: "",
      apellido: "",
      edad: "",
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(formOptions);
    console.log(user);
    /*useEffect(() => {
            setUser({...user, password: ""})
        }, [user])
        */
    const crud = async () => {
        await sendData(user, 1);
    };

    return (
      <div className="col-12 d-flex flex-column justify-content-between align-items-center p-4 m-3">
        <form className="registrar col-8" onSubmit={handleSubmit(crud)}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp03ufSRfn7HaHhshFyqzmGCWQjh_LozvMRA&usqp=CAU"
            alt="" className="ima1"/>

          <div className="">
            <label className="text-black form-label">Usuario</label>
            <input
              {...register("name")}
              type="text"
              className="form-control"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group ">
            <label className="text-black">Nombre</label>
            <input
              {...register("nombre")}
              type="texts"
              className="form-control"
              value={user.nombre}
              onChange={(e) => setUser({ ...user, nombre: e.target.value })}
            />
            {errors.nombre && (
              <span className="text-danger">{errors.nombre.message}</span>
            )}
          </div>

          <div className="form-group ">
            <label className="text-black">Apellido</label>
            <input
              {...register("apellido")}
              type="text"
              className="form-control"
              value={user.apellido}
              onChange={(e) => setUser({ ...user, apellido: e.target.value })}
            />
            {errors.apellido && (
              <span className="text-danger">{errors.apellido.message}</span>
            )}
          </div>

          <div className="form-group ">
            <label className="text-black">Edad</label>
            <input
              {...register("edad")}
              type="text"
              className="form-control"
              value={user.edad}
              onChange={(e) => setUser({ ...user, edad: e.target.value })}
            />
            {errors.edad && (
              <span className="text-danger">{errors.edad.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="text-black" id="correo">
              Correo
            </label>
            <input
              {...register("email")}
              type="text"
              className="form-control"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group ">
            <label className="text-black">Contraseña</label>
            <input
              {...register("password")}
              type="password"
              className="form-control"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </div>
          
          <button
            onClick={sendData}
            type="buttom"
            className="btreg btn btn-succsess"
          >
            Crear Cuenta
          </button>
        </form>
      </div>
    );
};

FormCuenta.propTypes = {
    userProp: PropTypes.object,
    tittleButton: PropTypes.string,
    option: PropTypes.number,
};


export default FormCuenta