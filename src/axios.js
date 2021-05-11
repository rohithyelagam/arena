import axios from "axios"

const instance = axios.create({
    baseURL: 'https://arena-backend-9.herokuapp.com',
  });

export default instance;