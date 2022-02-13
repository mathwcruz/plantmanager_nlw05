import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL || `http://${process.env.IP_ADDRESS}:3333`,
})