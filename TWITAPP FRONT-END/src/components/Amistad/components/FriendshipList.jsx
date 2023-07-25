import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const FriendshipList = () => {
  const [friendships, setFriendships] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getFriends = async () => {
      try {
        const res = await axios.get("http://localhost:3005/api/read-amistades", {
          headers: {
            "x-token": token,
          },
        });

        if (Array.isArray(res.data.amigo)) {
          setFriendships(res.data.amigo);
        }
      } catch (error) {
        console.error("Error al obtener la lista de amistades:", error);
      }
    };

    getFriends();
  }, []);
  console.log(friendships);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h1>Amistades</h1>
        <div>
          <Link to="/amigo">
            <button className="btn btn-primary">Regresar</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {friendships.map((amigo) => (
          <div className='col-md-4 p-2' key={amigo._id}>
            <div className='card'>
              <div className='card-header'>
                <h5>ID: {amigo._id}</h5>
                <p>Nombre: {amigo.name}</p>
                <p>Email: {amigo.email}</p>
                <p>Rol: {amigo.rol}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendshipList;