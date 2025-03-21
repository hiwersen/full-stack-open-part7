import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  console.log('USERS DATA @services/users.js', data)
  return data;
};

const post = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials);
  return data;
};

export default { getAll, post };
