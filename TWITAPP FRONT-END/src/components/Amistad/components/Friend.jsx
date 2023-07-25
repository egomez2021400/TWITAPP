import React, { useEffect, useState } from 'react';
import { getUsers, addFriendship } from '../utils/Amistades.js';
import { Link } from "react-router-dom";
import axios from 'axios';

const Friend = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [friendId, setFriendId] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      const results = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddFriendship = async () => {
    try {
      if (selectedUserId) {
        await addFriendship(selectedUserId);
        fetchUsers();
        setSelectedUserId('');
        setFriendId(selectedUserId); // Establecer el ID del usuario actual en el campo de texto
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (friendId) {
        const token = localStorage.getItem("token");
        const res = await axios.post(`http://localhost:3005/api/addAmis/${friendId}`, null, {
          headers: {
            "x-token": token,
          },
        });
        console.log(res.data); // Mensaje de éxito o información de la amistad agregada
        fetchUsers();
        setFriendId('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigateToFriendshipList = () => {
    window.location.href = '/amistades';
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <form onSubmit={handleFormSubmit} className="form-inline">
          <div className="mb-3">
            <label htmlFor="friendId" className="form-label">ID del amigo:</label>
            <input
              type="text"
              className="form-control"
              id="friendId"
              value={friendId}
              onChange={(e) => setFriendId(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Crear amistad</button>
        </form>
        <div>
          <Link to='/amistades'>
            <button className="btn btn-primary">
              Ver Amistades
            </button>
          </Link>
        </div>
      </div>
      <div className="row">
        {searchResults.map((user) => (
          <div key={user._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-text">Nombre: {user.name}</h5>
                <p className="card-text">Apellido: {user.apellido}</p>
                <p className="card-text">Edad: {user.edad}</p>
                <p className="card-text">Email: {user.email}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedUserId(user._id);
                    setFriendId(user._id); // Establecer el ID del usuario en el campo de texto al presionar el botón
                  }}
                >
                  Agregar como amigo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friend;