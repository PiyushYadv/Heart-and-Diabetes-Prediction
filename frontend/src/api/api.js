import axios from "axios";

export const API = axios.create({
  baseURL: "http://127.0.0.1:5000", // Flask backend URL
});

// Disease prediction POST call
export const predict = async (disease, payload) => {
  try {
    const { data } = await API.post(`/predict/${disease}`, payload);
    return data; // expected format: { probability, prediction }
  } catch (error) {
    console.log(error);
  }
};
