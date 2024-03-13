import * as services from "~/services";

export const getAllLocations = async (axiosInstance) => {
    try {
        const res = await services.getAllLocations(axiosInstance);
        return res;
    } catch (err) {
        console.log(err);
    }
};
