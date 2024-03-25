export const getAllTimeshare = (axiosInstance, form) => {
    const page = form?.page;
    const limit = form?.limit;
    return axiosInstance.get(
        `/api/v1/timeshare/listing?page=${page}&limit=${limit}&orderBy=startDate&orderType=DESC`
    );
};

export const getTimeshareByProjectID = (axiosInstance, projectID, form) => {
    const page = form?.page;
    const limit = 5;
    return axiosInstance.get(
        `/api/v1/timeshare/getAll/${projectID}?page=${page}&limit=${limit}&orderBy=startDate&orderType=DESC`
    );
};

export const getTimeshareDetailById = (axiosInstance, id) => {
    return axiosInstance.get(`/api/v1/timeshare/${id}`);
};

export const createNewTimeshare = (axiosInstance, typeRoomID, userID, form) => {
    return axiosInstance.post(
        `api/v1/timeshare/create?typeRoomID=${typeRoomID}&userID=${userID}`,
        form
    );
};

export const getAllTimesharesSold = (axiosInstance, form) => {
    const id = form?.id;
    const page = form?.page;
    const limit = form?.limit;
    return axiosInstance.get(
        `/api/v1/timeshare/getAllOfSoldReservationStage?id=${id}&page=${page}&limit=${limit}`
    );
};
