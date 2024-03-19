import * as services from "~/services";

export const createFeedback = async (axiosInstance, form) => {
    try {
        const res = await services.createFeedback(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const getAllFeedbacks = async (axiosInstance, form) => {
    try {
        const res = await services.getAllFeedbacks(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const updateShowFeedback = async (axiosInstance, id) => {
    try {
        const res = await services.updateShowFeedback(axiosInstance, id);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const deleteFeedback = async (axiosInstance, id) => {
    try {
        const res = await services.deleteFeedback(axiosInstance, id);
        return res;
    } catch (err) {
        console.log(err);
    }
};
