// src/baseURL.js
const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000"
  : import.meta.env.VITE_API_URL;

export default BASE_URL;
console.log("BASE",BASE_URL);
console.log("This is import",import.meta.env.DEV,import.meta.env.VITE_API_URL,)
console.log(import.meta.env);
console.log(import.meta.env.VITE_API_URL);

