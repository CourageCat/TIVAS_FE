import * as services from "~/services";

export const createNewTypeRoom = async (axiosInstance, param, form) => {
  try {
    const res = await services.createNewTypeRoom(axiosInstance, param, form);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getAllTypeRoomAdmin = async (axiosInstance, param, form) => {
  try {
    const res = await services.getAllTypeRoomAdmin(axiosInstance, param, form);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTypeRoomAdmin = async (axiosInstance, param) => {
  try {
    const res = await services.deleteTypeRoom(axiosInstance, param);
    return res;
  } catch (err) {
    console.log(err);
  }
};
