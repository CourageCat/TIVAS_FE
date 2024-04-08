import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import InputItem from "~/components/InputItem";
import { useEffect, useState } from "react";
import images from "~/assets/images";
import { useRef } from "react";
import { editMyUser, getMyUser } from "~/controllers/user";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ToastNotify from "~/components/ToastNotify";
import { resetEditUser } from "~/redux/userSlice";

const cx = classNames.bind(styles);

function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [email, setEmail] = useState("");

  const avatarRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);
  const userState = useSelector((state) => state.user.user);
  const editState = useSelector((state) => state.user.editUser);

  useEffect(() => {
    if (currentUser === null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (editState.error !== "") {
      toast.custom(
        () => <ToastNotify type="error" title="Error" desc={editState.error} />,
        { duration: 2000 }
      );
      dispatch(resetEditUser());
    } else if (editState.success !== "") {
      console.log(editState.success);
      toast.custom(
        () => (
          <ToastNotify
            type="success"
            title="Success"
            desc={editState.success}
          />
        ),
        { duration: 2000 }
      );
      dispatch(resetEditUser());
    }
  }, [dispatch, editState]);

  useEffect(() => {
    if (currentUser !== null) {
      getMyUser(dispatch, axiosInstance, currentUser?.data?.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    setUsername(userState?.data?.data?.username);
    setFullName(userState?.data?.data?.fullName);
    setNumberPhone(userState?.data?.data?.phoneNumber);
    setEmail(userState?.data?.data?.email);
  }, [userState]);

  useEffect(() => {
    return () => avatar && URL.revokeObjectURL(avatar.preview);
  }, [avatar]);

  const handleFileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAvatar(file);
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
    avatarRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fullName === "" || numberPhone === "") {
      return toast.custom(
        () => (
          <ToastNotify
            type="error"
            title="Error"
            desc={"Please fill in all information"}
          />
        ),
        { duration: 2000 }
      );
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("fullName", fullName);
      formData.append("numberPhone", numberPhone);
      formData.append("avatar", avatar);

      await editMyUser(dispatch, axiosInstance, formData);
    }
  };

  return (
    <div className={cx("wrapper")}>
      {userState.data !== null && (
        <div>
          <h2 className={cx("heading")}>My profile</h2>
          <h3 className={cx("title")}>
            {currentUser?.data?.type === "Google" &&
              "This is account login by Google"}
          </h3>
          <div className={cx("profile")}>
            <form onSubmit={handleSubmit}>
              <div className={cx("form")}>
                <section className={cx("information")}>
                  {/* Login google */}
                  <section className={cx("login-google")}>
                    {/* UserName */}
                    <div className={cx("input_compo")}>
                      <label htmlFor="username" className={cx("label")}>
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        className={cx("input")}
                        placeholder="Enter Username"
                        value={username}
                        // onChange={(e) => setUsername(e.target.value)}
                        readOnly
                      />
                    </div>
                    {/* Email   */}
                    <div className={cx("input_compo")}>
                      <label htmlFor="number_phone" className={cx("label")}>
                        Email
                      </label>
                      <input
                        type="text"
                        id="number_phone"
                        className={cx("input")}
                        placeholder="Email"
                        value={email}
                        readOnly
                      />
                    </div>
                    {/* Full Name */}
                    <div className={cx("input_compo")}>
                      <label htmlFor="full_name" className={cx("label")}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        className={cx("input")}
                        placeholder="Enter FullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    {/* Phone Number */}
                    <div className={cx("input_compo")}>
                      <label htmlFor="number_phone" className={cx("label")}>
                        Number phone
                      </label>
                      <input
                        type="text"
                        id="number_phone"
                        className={cx("input")}
                        placeholder="Enter Number phone"
                        value={numberPhone}
                        onChange={(e) => setNumberPhone(e.target.value)}
                      />
                    </div>

                    <button type="submit" className={cx("action-save")}>
                      Save
                    </button>
                  </section>
                </section>
                <section className={cx("choose-avatar")}>
                  <figure className={cx("box")}>
                    <img
                      src={avatar?.preview || userState?.data?.data?.avatarURL}
                      alt="avatar"
                      className={cx("avatar")}
                    />
                    {avatar !== null && (
                      <img
                        src={images.trashIcon}
                        alt="remove"
                        className={cx("icon")}
                        onClick={removeAvatar}
                      />
                    )}
                  </figure>
                  <div className={cx("action")}>
                    <div className={cx("button")}>Choose image</div>
                    <input
                      ref={avatarRef}
                      type="file"
                      className={cx("input")}
                      onChange={handleFileImage}
                    />
                  </div>
                </section>
              </div>
            </form>
          </div>
        </div>
      )}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={userState.isFetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Profile;
