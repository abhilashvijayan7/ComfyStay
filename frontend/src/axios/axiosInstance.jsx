import axios from "axios"
const userToken = localStorage.getItem('jwt');
const adminToken = localStorage.getItem('adminjwt');
const userInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${userToken}`

    },
  });
  const adminInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/admin`,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${adminToken}`
    },
  });
  
  export {userInstance,adminInstance};