import TippyHeadless from "@tippyjs/react/headless";
import styles from "./ActionUser.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { banUserById, getAllUsers, unBanUserById } from "~/controllers/user";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const cx = classNames.bind(styles);

function ActionUser({id, username, banStatus, setNotify, fetchUser }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const [open, setOpen] = useState(false);

  const [openPopup, setOpenPopup] = useState(false);
  const [banUser, setBanUser] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setBanUser("");
  };
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleOpenPopup = () => {
    handleClose();
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleSubmitBanUser = async (e) => {
    e.preventDefault();
    handleClosePopup();
    const res = await banUserById(axiosInstance, {
      id: id,
      reasonBan: banUser,
    });
    if (res) {
      setNotify(res);
      fetchUser();
    }
    // console.log(res);
  };

  const handleClickUnban = async () => {
    handleClose();
    const res = await unBanUserById(axiosInstance, {
      id: id,
    });
    if (res) {
      setNotify(res);
      fetchUser();
    }
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
                {banStatus === 0 ? (
                  <div className={cx("item", "ban")} onClick={handleOpenPopup}>
                    <svg
                      className={cx("icon")}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M2.71 12.584q.328.378.706.707l9.875-9.875a7 7 0 0 0-.707-.707l-9.875 9.875Z" />
                    </svg>
                    <span className={cx("title")}>Ban user</span>
                  </div>
                ) : (
                  <div
                    className={cx("item", "unban")}
                    onClick={handleClickUnban}
                  >
                    <svg
                      className={cx("icon")}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M2.71 12.584q.328.378.706.707l9.875-9.875a7 7 0 0 0-.707-.707l-9.875 9.875Z" />
                    </svg>
                    <span className={cx("title")}>Unban user</span>
                  </div>
                )}
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
          open={openPopup}
          onClose={handleClosePopup}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClosePopup();
            },
          }}
        >
          <DialogTitle>
            <h4 className={cx("title_popup")}>
              Ban user: <span className={cx("text")}>{username}</span>
            </h4>
          </DialogTitle>
          <DialogContent dividers>
            <div className={cx("form_popup")}>
              <label htmlFor="banUser" className={cx("label")}>
                Please fill in the reason for banning the user: {username}
              </label>
              <textarea
                id="banUser"
                className={cx("textArea")}
                value={banUser}
                onChange={(e) => setBanUser(e.target.value)}
              ></textarea>
            </div>
          </DialogContent>
          <DialogActions>
            <Button style={{ fontSize: "1.4rem" }} onClick={handleClosePopup}>
              Cancel
            </Button>
            <Button
              style={{ fontSize: "1.4rem" }}
              type="submit"
              onClick={handleSubmitBanUser}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default ActionUser;
