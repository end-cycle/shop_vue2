import axios from "axios";

import nprogress from "nprogress";
import store from "@/store";
import "nprogress/nprogress.css";
const requests = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

requests.interceptors.request.use((config) => {
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  nprogress.start();
  return config;
});

requests.interceptors.response.use(
  (res) => {
    nprogress.done();
    return res.data;
  },
  (err) => {
    alert("服务器响应数据失败", err);
  }
);

export default requests;
