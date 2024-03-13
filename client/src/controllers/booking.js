import * as services from "~/services";

export const compleateBooking = async (axiosInstance, form) => {
  try {
    const res = await services.compleateBooking(axiosInstance, form);
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
  