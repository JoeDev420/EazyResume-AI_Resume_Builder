import axios from "axios";


let onUnauthorized = null;


export const registerUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,                
});


 
API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      if (onUnauthorized) {
        onUnauthorized(); 
      }
    }

    return Promise.reject(error);
  }
);

export default API;
