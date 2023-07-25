import { useState } from "react";
import axios from "axios";

const Encuesta = () => {
  const [pregunta, setPregunta] = useState("");

  const handlePreguntaChange = (event) => {
    setPregunta(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token"); // Get the token from local storage
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:3005/api/Addencuesta",
        { pregunta },
        config
      );
      console.log(response.data);
      // Handle success message or redirect to the list of encuestas
    } catch (error) {
      console.error(error);
      // Handle error message
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pregunta">Pregunta:</label>
          <input
            type="text"
            className="form-control"
            id="pregunta"
            value={pregunta}
            onChange={handlePreguntaChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Publicar Encuesta
        </button>
      </form>
    </div>
  );
};

export default Encuesta;