import axios from "axios";

export const get = async (url) => {
  const { data } = await axios.get(url)
  return data
}

export const create = async (url, object) => {
  const { data } = await axios.post(url, object)
  return data
}

export const edit = async (url, object) => {
  const { data } = await axios.put(url, object)
  return data
}

export const eliminate = async (url) => {
  const { data } = await axios.delete(url)
  return data
}