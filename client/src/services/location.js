export const getAllLocations = (axiosInstance) => {
    return axiosInstance.get("/api/v1/location/getAll");
};
