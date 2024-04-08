import classNames from "classnames/bind";
import styles from "./ListProject.module.scss";

import images from "~/assets/images";
import { Link } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { checkPriority, putOpenBooking } from "~/controllers/project";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import createAxios from "~/configs/axios";

const cx = classNames.bind(styles);

function convertToDate(inputDate) {
  const date = new Date(inputDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const result = monthNames[month] + " " + day + " " + year;
  return result;
}

function ListProjectNo({ id, image, name, location, openDate, closeDate }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseBooking = async (e) => {
    e.preventDefault();
    const res = await checkPriority(axiosInstance, id);
    if (res.err === 0) alert("Success");
    else alert("failure");

    handleClose();
  };

  return (
    <div className={cx("project")}>
      <Link to="#!" className={cx("project-info")}>
        <img src={image} alt="Avatar" className={cx("img")} />

        <div className={cx("text")}>{name}</div>
        <div className={cx("text")}>{location}</div>
        <div className={cx("text")}>{convertToDate(openDate)}</div>
        <div className={cx("text")}>{convertToDate(closeDate)}</div>
        <Link
          to={`/admin/manageproject/userbuytimeshare/${id}`}
          className={cx("text")}
        >
          View user
        </Link>
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle> Do you want to switch to close booking?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button type="submit" onClick={handleCloseBooking}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ListProjectNo;
