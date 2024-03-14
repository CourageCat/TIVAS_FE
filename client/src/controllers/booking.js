import * as services from "~/services";

export const completeBooking = async (axiosInstance, form) => {
  try {
    const res = await services.completeBooking(axiosInstance, form);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const rejectBooking = async (axiosInstance, form) => {
    try {
      const res = await services.rejectBooking(axiosInstance, form);
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  