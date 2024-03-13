import TippyHeadless from "@tippyjs/react/headless";
import styles from "./ActionTypeRoom.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { banUserById, getAllUsers, unBanUserById } from "~/controllers/user";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteTypeRoomAdmin } from "~/controllers/typeRoom";
import { createNewTimeshare } from "~/controllers/timeshare";

const cx = classNames.bind(styles);

const convertDate = (inputDate) => {
  const parts = inputDate.split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  return `${day}/${month}/${year}`;
};

function ActionTypeRoom({ id, nameProject, setNotify }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const [open, setOpen] = useState(false);
  const [openNewTimeShare, setOpenNewTimeshare] = useState("");

  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleOpenNewTimeshare = () => {
    handleClose();
    setOpenNewTimeshare(true);
  };

  const handleCloseNewTimeshare = () => {
    setOpenNewTimeshare(false);
    setPrice("");
    setStartDate("");
    setEndDate("");
  };

  const deleteTypeRoom = async (id) => {
    const res = await deleteTypeRoomAdmin(axiosInstance, id);
    setNotify({
      ...res,
      mess: res?.message,
    });
    handleClose();
  };

  const handleSubmitNewTimeshare = async () => {
    const form = {
      price: +price,
      startDate: convertDate(startDate),
      endDate: convertDate(endDate),
    };
    setIsLoading(true);
    const res = await createNewTimeshare(
      axiosInstance,
      id,
      currentUser?.data?.id,
      form
    );
    setIsLoading(false);
    setNotify({
      ...res,
      mess: res?.message,
    });
    handleCloseNewTimeshare();
  };

  return (
    <div>
      <TippyHeadless
        visible={open === true}
        interactive
        render={(attrs) => (
          <div className="box" tabIndex="-1" {...attrs}>
            <section className={cx("container")}>
              <div className={cx("list")}>
                <div
                  className={cx("item", "view_project_detail")}
                  onClick={handleOpenNewTimeshare}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                  </svg>
                  <span className={cx("title")}>
                    Create timeshare for typeroom
                  </span>
                </div>
                <div
                  className={cx("item", "view_project_detail")}
                  onClick={() => deleteTypeRoom(id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                  </svg>
                  <span className={cx("title")}>Delete Typeroom</span>
                </div>
              </div>
            </section>
          </div>
        )}
        onClickOutside={handleClose}
      >
        <svg
          onClick={toggleOpen}
          className={cx("icon")}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z" />
          <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
          <path d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z" />
        </svg>
      </TippyHeadless>
      <div className={cx("popup")}>
        <Dialog
          open={openNewTimeShare}
          onClose={handleCloseNewTimeshare}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              handleCloseNewTimeshare();
            },
          }}
        >
          <DialogTitle>
            <h2 className={cx("heading_popup")}>Create timeshare</h2>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p className={cx("desc_popup")}>
                Please fill in the information below
              </p>
            </DialogContentText>
            <div className={cx("list-popup")}>
              <div className={cx("input_popup")}>
                <label htmlFor="reservationPrice" className={cx("label")}>
                  Price timeshare
                </label>
                <input
                  type="number"
                  className={cx("input")}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  id="reservationPrice"
                />
              </div>
              <div className={cx("input_popup")}>
                <label htmlFor="openDate" className={cx("label")}>
                  Open date
                </label>
                <input
                  type="date"
                  className={cx("input")}
                  id="openDate"
                  value={startDate}
                  placeholder="Open date"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className={cx("input_popup")}>
                <label htmlFor="closeDate" className={cx("label")}>
                  Close date
                </label>
                <input
                  type="date"
                  className={cx("input")}
                  id="closeDate"
                  value={endDate}
                  placeholder="Close date"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ fontSize: "1.4rem" }}
              onClick={handleCloseNewTimeshare}
            >
              Cancel
            </Button>
            <Button
              style={{ fontSize: "1.4rem" }}
              type="submit"
              onClick={handleSubmitNewTimeshare}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default ActionTypeRoom;
