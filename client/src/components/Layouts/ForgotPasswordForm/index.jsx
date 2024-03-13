import classNames from "classnames/bind";
import styles from "./ForgotPasswordForm.module.scss";
import { useState } from "react";
import InputItem from "~/components/InputItem";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { forgotPassword } from "~/controllers/auth";

const cx = classNames.bind(styles);

function ForgotPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const stateForgot = useSelector((state) => state.forgotPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(dispatch, axiosInstance, {
      email: stateForgot.resetPassword.email,
      newPassword: password,
    });
  };

  return (
    <div className={cx("login-wrapper")}>
      <h2 className={cx("heading")}>Forgot password</h2>
      <form className={cx("form")} onSubmit={handleSubmit}>
        <div className={cx("list-input")}>
          <InputItem
            type="password"
            value={password}
            setValue={setPassword}
            placeholder="Password *"
          />
          <InputItem
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            placeholder="Confirm Password *"
          />
        </div>
        <div className={cx("footer")}>
          <button
            type={
              password === "" || confirmPassword === "" ? "button" : "submit"
            }
            className={cx("action-login", {
              "hide-login": password === "" || confirmPassword === "",
              "show-login": password !== "" && confirmPassword !== "",
            })}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
