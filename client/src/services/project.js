export const getTop10 = (axiosInstance) => {
    return axiosInstance.get("/api/v1/project/top10");
};

export const getProjectDetailById = (axiosInstance, id) => {
    return axiosInstance.get(`/api/v1/project/${id}`);
};

export const getAllTypeRoom = (axiosInstance, id) => {
    return axiosInstance.get(`/api/v1/typeroom/getAll/${id}`);
};

export const getTypeRoom = (axiosInstance, id) => {
    return axiosInstance.get(`/api/v1/typeroom/${id}`);
};

export const getProjectByStatus = (axiosInstance, form) => {
    const limit = 10;
    const page = form.page;
    const status = form.status;
    return axiosInstance.get(
        `/api/v1/project/search?page=${page}&limit=${limit}&status=${status}`
    );
};

export const getProjectTimeshare = (axiosInstance, form) => {
    const limit = 10;
    const page = form.page;
    return axiosInstance.get(
        `/api/v1/project/search?page=${page}&limit=${limit}&status=3`
    );
};

export const putOpenBooking = (axiosInstance, id) => {
    return axiosInstance.put(`/api/v1/project/openBooking/${id}`);
};

export const putCloseBooking = (axiosInstance, id) => {
    return axiosInstance.get(`/api/v1/reservationticket/checkPriority/${id}`);
};

export const getAllProject = (axiosInstance, form) => {
    const limit = form.limit;
    const page = form.page;
    return axiosInstance.get(
        `/api/v1/project/getAll?page=${page}&limit=${limit}`
    );
};

export const updateReservation = (axiosInstance, id, form) => {
    return axiosInstance.put(
        `/api/v1/project/updateReservationInfo/${id}`,
        form
    );
};

export const openReservaion = (axiosInstance, id) => {
    return axiosInstance.put(`api/v1/project/openReservationTicket/${id}`);
};

export const createNewProject = (axiosInstance, form) => {
    return axiosInstance.post("/api/v1/project/create", form);
};

export const getAllWithType = (axiosInstance, form) => {
    const limit = form.limit;
    const page = form.page;
    return axiosInstance.get(
        `/api/v1/project/getAllWithType?page=${page}&limit=${limit}`
    );
};

export const getAllTypeOfProject = (axiosInstance, param) => {
    return axiosInstance.get(`/api/v1/project/getTypeOfProject/${param}`);
};

export const searchNameAndLocation = (axiosInstance, form) => {
    const info = form.info;
    const limit = form.limit;
    return axiosInstance.get(
        `/api/v1/project/searchNameAndLocationProject?info=${info}&limit=${limit}`
    );
};

export const getAllProjectInReservation = (axiosInstance, form) => {
    const page = form?.page;
    const limit = form?.limit;
    return axiosInstance.get(
        `/api/v1/Project/getAllInReservation?page=${page}&limit=${limit}`
    );
};

export const searchProjects = (axiosInstance, form) => {
    const page = form.page;
    const info = form.info;
    const searchBy = form.searchBy;
    const limit = form.limit;
    return axiosInstance.get(
        `/api/v1/project/search?page=${page}&limit=${limit}&info=${info}&searchBy=${searchBy}`
    );
};

export const getAllSold = (axiosInstance, form) => {
    const page = form.page;
    const limit = form.limit;
    return axiosInstance.get(
        `/api/v1/project/getAllSold?page=${page}&limit=${limit}`
    );
};

export const getAllSoldReservation = (axiosInstance, form) => {
    const projectID = form.projectID;
    const page = form.page;
    const limit = form.limit;
    return axiosInstance.get(
        `/api/v1/project/getAllSoldReservationStageOfProject?projectID=${projectID}&page=${page}&limit=${limit}`
    );
};
