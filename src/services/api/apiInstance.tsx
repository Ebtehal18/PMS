import axios from "axios";

export const baseURL='https://upskilling-egypt.com:3003/api/v1';
export const imgURL='https://upskilling-egypt.com:3003';
// create axios instance
// axios.create('baseurl').post('endpoint')===>axiosinstance

export const axiosPublicInstance = axios.create({
    baseURL
  
})
// any requeset will have that headers
// The word "Bearer" is a keyword in authentication schemes.
// It tells the server that the token is a Bearer Token (used for authorization).
// Bearer ${token} is necessary because it follows authentication standards.

export const axiosPrivateInstance = axios.create({
    baseURL,
  });
  
  // Interceptor to Attach Token Dynamically
//   Interceptors in Axios allow us to modify requests before they are sent to the server.

  axiosPrivateInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
