// utils/publicacionApi.js

import axios from "axios";

const URL = "http://localhost:3005/api/";

export const createPublicacion = async (userId, publicacionData) => {
  try {
    const response = await axios.post(`${URL}publicacion/${userId}`, publicacionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const readPublicaciones = async () => {
  try {
    const response = await axios.get(`${URL}read-publicaciones`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePublicacion = async (userId, publicacionId) => {
  try {
    const response = await axios.delete(`${URL}delete-publicacion/${userId}/${publicacionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
