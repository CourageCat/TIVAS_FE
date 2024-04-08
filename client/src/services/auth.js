export const refreshToken = async (axios) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/refreshtoken`
    );
    return res.data;
  } catch (err) {
    return "error";
  }
};

export const login = (axiosInstance, form) => {
  return axiosInstance.post("/api/v1/auth/login", form);
};

export const logout = (axiosInstance) => {
  return axiosInstance.post("/api/v1/auth/logout");
};

export const register = (axiosInstance, form) => {
  return axiosInstance.post("/api/v1/auth/register", form);
};

export const getAll = (axiosInstance) => {
  return axiosInstance.get("/api/v1/user/getAllUsers");
};

export const sendMail = (axiosInstance, form) => {
  return axiosInstance.post("/api/v1/auth/sendmail", form);
};

export const registerByEmail = (axiosInstance, form) => {
  return axiosInstance.post("/api/v1/auth/registerbyemail", form);
};

export const checkUsername = (axiosInstance, form) => {
  return axiosInstance.post("/api/v1/auth/checkusernameregister", form);
};

export const loginGoogle = (axiosInstance, form) => {
  return axiosInstance.post("/api/v1/auth/google", form);
};

export const registerGoogle = (axiosInstance, form) => {
  return axiosInstance.post("/api/v1/auth/registergoogle", form);
};

export const sendMailForgotPassword = (axiosInstance, form) => {
  return axiosInstance.post("/api/v1/auth/sendmailforgotpassword", form);
};

export const forgotPassword = (axiosInstance, form) => {
  return axiosInstance.post("/api/v1/auth/resetpassword", form);
};

export const resetPasswordByEmail = (axiosInstance, form) => {
  return axiosInstance.post("/api/v1/auth/resetpasswordbyemail", form);
};
