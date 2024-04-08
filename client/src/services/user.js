export const getAvatarUser = (axiosInstance, param) => {
  return axiosInstance.get(`/api/v1/user/getavtuser/${param}`);
};

export const getUser = (axiosInstance, param) => {
  return axiosInstance.get(`/api/v1/user/getuser/${param}`);
};

export const editUser = (axiosInstance, form) => {
  return axiosInstance.put(`/api/v1/user/edituser`, form);
};

export const getBankingUser = (axiosInstance, param) => {
  return axiosInstance.get(`/api/v1/user/getbankinguser/${param}`);
};

export const getAllUsers = (axiosInstance, form) => {
  const limit = form.limit;
  const page = form.page;
  return axiosInstance.get(
    `/api/v1/user/getallusers?page=${page}&limit=${limit}`
  );
};

export const banUser = (axiosInstance, form) => {
  return axiosInstance.post("/api/v1/user/banuser", form);
};

export const unBanUser = (axiosInstance, form) => {
  return axiosInstance.post("/api/v1/user/unbanuser", form);
};

export const viewWishlist = (axiosInstance, form) => {
  const id = form?.id;
  const limit = form?.limit;
  const page = form?.page;
  const orderType = form?.orderType;
  return axiosInstance.get(
    `/api/v1/user/viewwishlist?orderType=${orderType}&id=${id}&page=${page}&limit=${limit}`
  );
};

export const addWishList = (axiosInstance, form) => {
  const id = form.id;
  const projectID = form.projectID;
  return axiosInstance.post(
    `/api/v1/user/addwishlist?id=${id}&projectID=${projectID}`
  );
};

export const deleteWishlist = (axiosInstance, form) => {
  const id = form.id;
  const projectID = form.projectID;
  return axiosInstance.delete(
    `/api/v1/user/deletewishlist?id=${id}&projectID=${projectID}`
  );
};

export const checkWishList = (axiosInstance, form) => {
  const id = form.id;
  const projectID = form.projectID;
  return axiosInstance.get(
    `/api/v1/user/checkprojectwishlist?id=${id}&projectID=${projectID}`
  );
};

export const getHistory = (axiosInstance, form) => {
  const id = form.id;
  const status = form.status;
  const page = form.page;
  const limit = form.limit;
  return axiosInstance.get(
    `/api/v1/User/getHistory?id=${id}&status=${status}&page=${page}&limit=${limit}`
  );
};
