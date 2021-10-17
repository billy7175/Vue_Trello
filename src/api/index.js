import axios from "axios";
import router from "../router";
const DOMAIN = "http://localhost:3000";
const UNAUTHORIZED = 401;
// const onUnauthorized = () => {
//   router.push("/login");
// };


/***Important Factor***/
const onUnauthorized = () => {
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`);
};

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((result) => result.data)
    .catch((result) => {
      const { status } = result.response;
      console.log("status ", result);
      if (status === UNAUTHORIZED) return onUnauthorized();
      throw Error(result);
    });
};

export const setAuthInHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : null;
};


const { token } = localStorage;
if (token) setAuthInHeader(token);


export const board = {
  fetch() {
    return request("get", "/boards");
  },
  create(title) {
    return request("post", "/boards", { title });
  },
};

export const auth = {
  login(email, password) {
    return request("post", "/login", { email, password });
  },
};
