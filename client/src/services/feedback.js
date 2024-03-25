export const createFeedback = (axiosInstance, form) => {
    return axiosInstance.post("/api/v1/feedback/add", form);
};

export const getAllFeedbacks = (axiosInstance, form) => {
    const limit = form.limit;
    const page = form.page;
    const status = form.status;
    const orderType = form.orderType;
    return axiosInstance.get(
        `/api/v1/feedback/getAll?status=${status}&page=${page}&limit=${limit}&orderType=${orderType}`
    );
};

export const updateShowFeedback = (axiosInstance, id) => {
    return axiosInstance.put(`/api/v1/feedback/update/${id}`);
};

export const deleteFeedback = (axiosInstance, id) => {
    return axiosInstance.delete(`/api/v1/feedback/${id}`);
};
