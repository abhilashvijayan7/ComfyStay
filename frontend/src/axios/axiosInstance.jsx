import axios from "axios"

const userInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const adminInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/admin`,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export {userInstance,adminInstance};