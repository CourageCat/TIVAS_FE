import classNames from "classnames/bind";
import styles from "./Navigations.module.scss";
import { Link } from "react-router-dom";
import Search from "~/components/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import Popup from "~/components/AuthPopup";
import Login from "~/components/Layouts/Login";
import Register from "~/components/Layouts/Register";
import { Toaster, toast } from "sonner";
import ToastNotify from "~/components/ToastNotify";
import { useCallback, useEffect, useState } from "react";
import { resetLogin, resetRegister, resetSendMail } from "~/redux/authSlice";
import { resetForm } from "~/redux/formRegisterSlice";
import ForgotPassword from "~/components/Layouts/ForgotPassword";
import TippyHeadless from "@tippyjs/react/headless";
import MenuAvatar from "~/components/MenuAvatar";
import { logout } from "~/controllers/auth";
import { getAvatarUser } from "~/controllers/user";

const cx = classNames.bind(styles);

const LIST_NAV = [
  {
    value: "Home",
    link: "/",
  },
  {
    value: "Listings",
    link: "/listings",
  },

  {
    value: "News",
    link: "/news",
  },
  {
    value: "About",
    link: "/about",
  },
];

function Navigations() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [menu, setMenu] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);
  const [imgAvatar, setImgAvatar] = useState("");

  const statusRegister = useSelector((state) => state.auth.register);

  useEffect(() => {
    const fetchGetAvatarUser = async () => {
      const res = await getAvatarUser(
        axiosInstance,
        currentUser?.data?.username
      );
      if (res) setImgAvatar(res.data.avatarURL);
      else setImgAvatar("");
    };
    fetchGetAvatarUser();
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleCloseLogin = () => {
    setLogin(false);
    dispatch(resetSendMail());
    dispatch(resetLogin());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCloseRegister = useCallback(() => {
    setRegister(false);
    dispatch(resetSendMail());
    dispatch(resetForm());
    dispatch(resetRegister());
    sessionStorage.removeItem("emailRegister");
  });

  const handleCloseForgotPassword = () => {
    setForgotPassword(false);
  };

  const handleAccessRegister = () => {
    setRegister(true);
    setLogin(false);
    setForgotPassword(false);
  };

  const handleAccessLogin = () => {
    setLogin(true);
    setRegister(false);
    setForgotPassword(false);
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
    setRegister(false);
    setLogin(false);
  };

  const toggleMenuAvatar = () => {
    setMenu((prev) => !prev);
  };

  const hideMenuAvatar = () => {
    setMenu(false);
  };

  useEffect(() => {
    if (statusRegister?.success) {
      handleCloseRegister();
      toast.custom(
        () => (
          <ToastNotify
            type="success"
            title="Success"
            desc={"Your account registered successfully"}
          />
        ),
        { duration: 2000 }
      );
    }
  }, [dispatch, handleCloseRegister, statusRegister?.success]);
  const axiosInstance = createAxios(dispatch, currentUser);

  const renderNavbar = () => {
    return LIST_NAV.map((item, index) => {
      return (
        <Link to={item.link} key={index} className={cx("nav-item")}>
          {item.value}
        </Link>
      );
    });
  };

  const handleLogout = () => {
    logout(dispatch, axiosInstance);
    setMenu(false);
  };

  return (
    <div>
      <Toaster position="top-right" richColors expand={true} />
      <div className={cx("nav-wrapper")}>
        <div className={cx("container")}>
          {/* Logo */}
          <Link to="/">
            <h1 className={cx("logo")}>TIVAS</h1>
          </Link>
          {/* Navbar */}
          <section className={cx("list-nav")}>{renderNavbar()}</section>
          {/* Search */}
          <section className={cx("search")}>
            <Search />
          </section>
          {/* Actions */}
          <section className={cx("actions")}>
            {currentUser ? (
              <>
                {/* Notification */}
                <div className={cx("action", "notification")}>
                  <FontAwesomeIcon icon={faBell} className={cx("icon")} />
                </div>
                {/* Avatar */}
                <TippyHeadless
                  interactive
                  placement="bottom"
                  visible={menu === true}
                  render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                      <div className={cx("avatar-result")}>
                        <MenuAvatar handleLogout={handleLogout} />
                      </div>
                    </div>
                  )}
                  onClickOutside={hideMenuAvatar}
                >
                  <div className={cx("action", "avatar")}>
                    <img src={imgAvatar} alt="Avatar" className={cx("img")} />
                    <div className={cx("list-menu")} onClick={toggleMenuAvatar}>
                      <h4 className={cx("show-name")}>
                        {currentUser?.data.username}
                      </h4>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={cx("icon")}
                      />
                    </div>
                  </div>
                </TippyHeadless>
              </>
            ) : (
              <>
                <div className={cx("action")} onClick={() => setLogin(true)}>
                  <h4 className={cx("login")}>Sign in</h4>
                </div>
                <div className={cx("action")} onClick={() => setRegister(true)}>
                  <h4 className={cx("register")}>Sign up</h4>
                </div>
              </>
            )}
          </section>
        </div>
        {!currentUser && (
          <>
            {login === true && (
              <Popup trigger={login} onClose={handleCloseLogin}>
                <Login
                  handleAccessRegister={handleAccessRegister}
                  handleAccessForgotPassword={handleForgotPassword}
                />
              </Popup>
            )}
            {register === true && (
              <Register
                handleAccessLogin={handleAccessLogin}
                trigger={register}
                handleCloseRegister={handleCloseRegister}
              />
            )}
            {forgotPassword === true && (
              <ForgotPassword
                handleAccessLogin={handleAccessLogin}
                trigger={forgotPassword}
                handleCloseForgotPassword={handleCloseForgotPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Navigations;
