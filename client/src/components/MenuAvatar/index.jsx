import classNames from "classnames/bind";
import styles from "./MenuAvatar.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { useState } from "react";
import FormFeedback from "~/components/FormFeedback";

import Dialog from "@mui/material/Dialog";
import { DialogTitle, IconButton, DialogContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const cx = classNames.bind(styles);

function MenuAvatar({ handleLogout, hideMenuAvatar }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    hideMenuAvatar();
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={cx("wrapper")}>
      {currentUser?.data?.roleID === 3 && (
        <>
          <div className={cx("box")}>
            <Link to="/user/account/profile" className={cx("navigate", "text")}>
              <p className={cx("type-one")}>Profile</p>
            </Link>
            <Link className={cx("navigate", "text")}>
              <p className={cx("type-zero")}>Settings</p>
            </Link>
            <Link to="/wishlist" className={cx("navigate", "text")}>
              <p className={cx("type-one")}>Wishlist</p>
            </Link>
            <Link className={cx("navigate", "text")} onClick={handleClickOpen}>
              <p className={cx("type-zero")}>Feedback</p>
            </Link>
          </div>

          <div className={cx("box")}>
            <Link className={cx("navigate", "text")}>
              <p className={cx("type-one")}>Help</p>
            </Link>
            <Link className={cx("navigate", "text")} onClick={handleLogout}>
              <p className={cx("type-zero")}>Logout</p>
            </Link>
          </div>
        </>
      )}
      {currentUser?.data?.roleID === 2 && (
        <div className={cx("box")}>
          <Link to="/admin" className={cx("navigate", "text")}>
            <p className={cx("type-one")}>Staff page</p>
          </Link>
          <Link className={cx("navigate", "text")} onClick={handleLogout}>
            <p className={cx("type-zero")}>Logout</p>
          </Link>
        </div>
      )}
      {currentUser?.data?.roleID === 1 && (
        <div className={cx("box")}>
          <Link to="/admin" className={cx("navigate", "text")}>
            <p className={cx("type-one")}>Admin page</p>
          </Link>
          <Link className={cx("navigate", "text")} onClick={handleLogout}>
            <p className={cx("type-zero")}>Logout</p>
          </Link>
        </div>
      )}
      <>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Form Feedback
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            {/* <Booking
                            handleClose={handleClose}
                            setMessage={setMessage}
                        /> */}
            <FormFeedback />
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
}

export default MenuAvatar;
