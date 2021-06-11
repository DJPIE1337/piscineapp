import axios from 'axios'
const {APIURL} = process.env

const API = axios.create({
  withCredentials: true,
  baseURL: APIURL + "api/v1/"
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