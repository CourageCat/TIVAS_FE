import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import InputItem from "~/components/InputItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerByEmail, sendMail } from "~/controllers/auth";
import createAxios from "~/configs/axios";

import { Toaster, toast } from "sonner";
import { resetSendMail } from "~/redux/authSlice";
import ToastNotify from "~/components/ToastNotify";

const cx = classNames.bind(styles);

function RegisterEmail({ handleAccessLogin }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();

  const stateLogin = useSelector((state) => state.auth.login);

  const axiosInstance = createAxios(dispatch, stateLogin.user);

  const stateEmail = useSelector((state) => state.auth.sendMail);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerByEmail(dispatch, axiosInstance, { email, otp });
  };

  const handleSendCodeEmail = async () => {
    await sendMail(dispatch, axiosInstance, { email });
  };

  useEffect(() => {
    if (stateEmail.error !== "") {
      toast.custom(
        () => (
          <ToastNotify type="error" title="Error" desc={stateEmail.error} />
        ),
        { duration: 2000 }
      );
      dispatch(resetSendMail());
    } else if (stateEmail.success !== "") {
      toast.custom(
        () => (
          <ToastNotify
            type="success"
            title="Success"
            desc={stateEmail.success}
          />
        ),
        { duration: 2000 }
      );
      dispatch(resetSendMail());
    }
  }, [dispatch, stateEmail.error, stateEmail.success]);

  return (
    <div className={cx("login-wrapper")}>
      <h2 className={cx("heading")}>Sign up</h2>
      <form className={cx("form")} onSubmit={handleSubmit}>
        <Toaster position="top-right" richColors expand={true} />
        <div className={cx("list-input")}>
          <InputItem
            type="text"
            value={email}
            setValue={setEmail}
            placeholder="Email address *"
          />
          <div>
            <div className={cx("otp")}>
              <InputItem
                type="text"
                value={otp}
                setValue={setOtp}
                placeholder="Enter 4-digit code *"
              />
              <div
                className={cx("action", {
                  "hide-action": email === "",
                  "show-action": email !== "",
                })}
                onClick={email === "" ? null : handleSendCodeEmail}
              >
                <h4 className={cx("otp-btn")}>Send code</h4>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("footer")}>
          <p className={cx("text")}>
            Your data will be used to enhance your website experience, manage
            account access, and for purposes outlined in our privacy policy.
          </p>

          <button
            type={email === "" || otp === "" ? "button" : "submit"}
            className={cx("action-login", {
              "hide-login": email === "" || otp === "",
              "show-login": email !== "" && otp !== "",
            })}
          >
            Continue
          </button>

          <p className={cx("text")}>
            Already have account?{" "}
            <span className={cx("link")} onClick={handleAccessLogin}>
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterEmail;
