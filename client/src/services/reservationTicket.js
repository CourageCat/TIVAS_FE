export const paymentReservaion = (axiosInstance, form) => {
  return axiosInstance.post(
    "/api/v1/reservationticket/paymentreservation",
    form
  );
};

export const createTicket = (axiosInstance, form) => {
  return axiosInstance.post("/api/v1/reservationticket/createTicket", form);
};

export const createReservation = (axiosInstance, form) => {
  return axiosInstance.post(
    "/api/v1/reservationticket/createReservation",
    form
  );
};

export const checkPriority = (axiosInstance, id) => {
  return axiosInstance.get(`/api/v1/reservationticket/checkPriority/${id}`);
};

export const getAllTicketByUser = (axiosInstance, form) => {
  const status = form.status;
  const id = form.id;
  const page = form.page;
  const limit = form.limit;
  return axiosInstance.get(
    `/api/v1/ReservationTicket/getAllTicketsByUser?id=${id}&status=${status}&page=${page}&limit=${limit}`
  );
};

export const getUserPriority = (axiosInstance, id, form) => {
  const page = form.page;
  const limit = form.limit;
  return axiosInstance.get(
    `/api/v1/ReservationTicket/getAllUserPriorityByAdmin/${id}?page=${page}&limit=${limit}`
  );
};

export const getUserNoPriority = (axiosInstance, id, form) => {
  const page = form.page;
  const limit = form.limit;
  return axiosInstance.get(
    `/api/v1/ReservationTicket/getAllUserNoPriorityByAdmin/${id}?page=${page}&limit=${limit}`
  );
};

export const refundMoneyTimeshare = (axiosInstance, id) => {
  return axiosInstance.get(
    `/api/v1/ReservationTicket/refundMoneyTimeshare/${id}`
  );
};
