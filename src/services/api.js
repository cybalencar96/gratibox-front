import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_URL || "https://gratibox-app.herokuapp.com/";

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

function getDeliveries(token) {
  return axios.get("/deliveries", configHeaders(token));
}

function sendAvaliation(body, token) {
  return axios.put("/deliveries", body, configHeaders(token));
}

const api = {
  login,
  signup,
  getSubscription,
  subscribe,
  getDeliveries,
  sendAvaliation,
};

export default api;
