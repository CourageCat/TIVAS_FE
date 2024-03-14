export const completeBooking = (axiosInstance, form) => {
  return axiosInstance.put("/api/v1/booking/completeBooking", form);
};

export const rejectBooking = (axiosInstance, form) => {
    return axiosInstance.put("/api/v1/booking/rejectBooking", form);
  };
  