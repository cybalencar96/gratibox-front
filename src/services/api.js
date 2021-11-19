import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_URL || "TODO - deploy link here";

function login() {}

function signup(signupForm) {
  return axios.post("/sign-up", signupForm);
}

const api = {
  login,
  signup,
};

export default api;
