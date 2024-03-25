export const createNewTypeRoom = (axiosInstance, param, form) => {
    return axiosInstance.post(`/api/v1/typeroom/create/${param}`, form);
};

export const getAllTypeRoomAdmin = (axiosInstance, param, form) => {
    const limit = form.limit;
    const page = form.page;
    return axiosInstance.get(
        `/api/v1/typeroom/getAll/${param}?page=${page}&limit=${limit}`
    );
};

export const deleteTypeRoom = (axiosInstance, param) => {
    return axiosInstance.delete(`/api/v1/typeroom/delete/${param}`);
};
