import axios from 'axios'
const APIURL = process.env.NODE_ENV === 'production' ? 'http://piscineapp.zbeb.eu/api/v1/' : 'http://localhost:3000/api/v1/';

const API = axios.create({
  withCredentials: true,
  baseURL: APIURL
})

export async function apiGet(dir)
 {
  const response = await API.get(dir);
  return response.data;
};

export async function apiPost(dir, values)
 {
  const response = await API.post(dir, values);
  return response;
};