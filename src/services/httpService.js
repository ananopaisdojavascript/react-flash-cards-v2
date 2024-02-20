// Importar a biblioteca axios
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000
})

// Função para obter os dados da API
const read = async(url) => {
  const { data } = await axiosInstance.get(url)
  return data;
}

const createFlashcard = async(url, object) => {
  const { data } = await axiosInstance.post(url, object)
  return data
}

const updateFlashcard = async(url, object) => {
  const { data } = await axiosInstance.put(url, object)
  return data
}

const eliminateFlashcard = async(id) => {
  await axiosInstance.delete(`${id}`)
} 

export default {
  read,
  createFlashcard,
  updateFlashcard,
  eliminateFlashcard
}