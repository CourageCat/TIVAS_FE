import * as services from "~/services";

export const getAllTimeshare = async (axiosInstance, form) => {
  try {
    const res = await services.getAllTimeshare(axiosInstance, form);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getTimeshareByProjectID = async (
  axiosInstance,
  projectID,
  form
) => {
  try {
    const res = await services.getTimeshareByProjectID(
      axiosInstance,
      projectID,
      form
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getTimeshareDetailById = async (axiosInstance, id) => {
  try {
    const res = await services.getTimeshareDetailById(axiosInstance, id);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createNewTimeshare = async (
  axiosInstance,
  typeRoomID,
  userID,
  form
) => {
  try {
    const res = await services.createNewTimeshare(
      axiosInstance,
      typeRoomID,
      userID,
      form
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
