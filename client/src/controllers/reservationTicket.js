import * as services from "~/services";

export const paymentReservaion = async (axiosInstance, form) => {
    try {
        const res = await services.paymentReservaion(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const createTicket = async (axiosInstance, form) => {
    try {
        const res = await services.createTicket(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const createReservation = async (axiosInstance, form) => {
    try {
        const res = await services.createReservation(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const checkPriority = async (axiosInstance, id) => {
    try {
        const res = await services.checkPriority(axiosInstance, id);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const getAllTicketByUser = async (axiosInstance, form) => {
    try {
        const res = await services.getAllTicketByUser(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const getUserPriority = async (axiosInstance, id, form) => {
    try {
        const res = await services.getUserPriority(axiosInstance, id, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const getUserNoPriority = async (axiosInstance, id, form) => {
    try {
        const res = await services.getUserNoPriority(axiosInstance, id, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const refundMoneyTimeshare = async (axiosInstance, id) => {
    try {
        const res = await services.refundMoneyTimeshare(axiosInstance, id);
        return res;
    } catch (err) {
        console.log(err);
    }
};
