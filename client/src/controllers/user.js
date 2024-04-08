import {
    editUserError,
    editUserStart,
    editUserSuccess,
    getUserError,
    getUserStart,
    getUserSuccess,
} from "~/redux/userSlice";
import * as services from "~/services";

export const getAvatarUser = async (axiosInstance, param) => {
    try {
        const res = await services.getAvatarUser(axiosInstance, param);
        if (res.err === 0) {
            return res;
        }
        return null;
    } catch (err) {
        console.log(err);
    }
};

export const getMyUser = async (dispatch, axiosInstance, param) => {
    dispatch(getUserStart());
    try {
        const res = await services.getUser(axiosInstance, param);
        if (res.err === 0) {
            dispatch(getUserSuccess(res));
        } else {
            dispatch(getUserError(res.mess));
        }
    } catch (err) {
        console.log(err);
        dispatch(getUserError("Error"));
    }
};

export const editMyUser = async (dispatch, axiosInstance, form) => {
    dispatch(editUserStart());
    try {
        const res = await services.editUser(axiosInstance, form);
        if (res.err === 0) {
            dispatch(editUserSuccess(res.mess));
        } else {
            dispatch(editUserError(res.mess));
        }
    } catch (err) {
        console.log(err);
        dispatch(editUserError("Error"));
    }
};

export const getBankingUser = async (axiosInstance, param) => {
    try {
        const res = await services.getBankingUser(axiosInstance, param);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const getAllUsers = async (axiosInstance, form) => {
    try {
        const res = await services.getAllUsers(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const banUserById = async (axiosInstance, form) => {
    try {
        const res = await services.banUser(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const unBanUserById = async (axiosInstance, form) => {
    try {
        const res = await services.unBanUser(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const viewWishlist = async (axiosInstance, form) => {
    try {
        const res = await services.viewWishlist(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const checkWishList = async (axiosInstance, form) => {
    try {
        const res = await services.checkWishList(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const addWishList = async (axiosInstance, form) => {
    try {
        const res = await services.addWishList(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const deleteWishlist = async (axiosInstance, form) => {
    try {
        const res = await services.deleteWishlist(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const getHistory = async (axiosInstance, form) => {
    try {
        const res = await services.getHistory(axiosInstance, form);
        return res;
    } catch (err) {
        console.log(err);
    }
};
