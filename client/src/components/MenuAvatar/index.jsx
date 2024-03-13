import classNames from "classnames/bind";
import styles from "./MenuAvatar.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { useState } from "react";

const cx = classNames.bind(styles);


function MenuAvatar({ handleLogout }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("box")}>
        <Link to="/user/account/profile" className={cx("navigate", "text")}>
          <p className={cx("type-one")}>Profile</p>
        </Link>
        <Link className={cx("navigate", "text")}>
          <p className={cx("type-zero")}>Settings</p>
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
    </div>
  );
}

export default MenuAvatar;
