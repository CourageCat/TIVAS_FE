import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "~/services";
import { loginSuccess, resetLogin } from "~/redux/authSlice";

const createAxios = (dispatch, user) => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: { authorization: user?.accessToken },
  });

  axios.defaults.withCredentials = true;
  axiosInstance.defaults.withCredentials = true;

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    async function (config) {
      if (user !== null) {
        let date = new Date();
        const accessToken = user?.accessToken.split(" ")[1];
        const decodedToken = jwtDecode(accessToken);
        if (decodedToken.exp < date.getTime() / 1000) {
          const data = await refreshToken(axios);
          console.log(data);
          if (data.err === 1) {
            dispatch(resetLogin());
          } else {
            const refreshUser = {
              ...user,
              accessToken: data.newAccessToken,
            };
            dispatch(loginSuccess(refreshUser));
            config.headers["authorization"] = `${refreshUser.accessToken}`;
          }
        }
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    async function (response) {
      return response.data;
    },
    async function (error) {
      dispatch(resetLogin());
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default createAxios;
