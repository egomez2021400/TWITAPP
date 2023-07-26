// utils/Amistades.js

import axios from 'axios';

const URL = "http://localhost:3005/api/";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${URL}read-user`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

export const addFriendship = async (friendId) => {
  try {
    const token = localStorage.getItem('token'); // Obtener el token del usuario logeado desde el almacenamiento local
    const response = await axios.post(`${URL}addAmis/${friendId}`, null, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error adding friendship');
  }
};

