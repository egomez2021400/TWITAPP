import axios from "axios";

const URL = "http://localhost:3005/api/";

export const createEncuesta = async (encuestaData, authToken) => {
  try {
    const response = await axios.post(`${URL}Addencuesta`, encuestaData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listEncuestas = async () => {
  try {
    const response = await axios.get(`${URL}encuesta`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEncuesta = async (encuestaId, authToken) => {
  try {
    const response = await axios.delete(`${URL}deleteEncuesta/${encuestaId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};