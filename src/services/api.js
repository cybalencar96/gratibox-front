import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_URL || "TODO - deploy link here";

const configHeaders = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

function login(signinForm) {
  return axios.post("/sign-in", signinForm);
}

function signup(signupForm) {
  return axios.post("/sign-up", signupForm);
}

function getSubscription(token) {
  return axios.get("/subscriber", configHeaders(token));
}

function subscribe(bodyInfo, token) {
  return axios.post("/subscriber", bodyInfo, configHeaders(token));
}

const api = {
  login,
  signup,
  getSubscription,
  subscribe,
};

export default api;
