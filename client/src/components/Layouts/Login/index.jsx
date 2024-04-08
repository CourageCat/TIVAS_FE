import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import InputItem from "~/components/InputItem";
import { useEffect, useState } from "react";
import images from "~/assets/images";
import { login as validateLogin } from "~/middlewares/Validates/validateForm";
import { useDispatch, useSelector } from "react-redux";
import { login, loginGoogle } from "~/controllers/auth";
import createAxios from "~/configs/axios";

import { Toaster, toast } from "sonner";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useGoogleLogin } from "@react-oauth/google";
import ToastNotify from "~/components/ToastNotify";
import { resetLogin, resetSendMail } from "~/redux/authSlice";
import CardContainerGoogle from "~/components/Layouts/CardRegisterGoogle/CardContainerGoogle";

const cx = classNames.bind(styles);

function Login({ handleAccessRegister, handleAccessForgotPassword }) {
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.login.user);
  const error = useSelector((state) => state.auth.login.error);
  const statusLogin = useSelector((state) => state.auth.login.isFetching);

  const stateEmail = useSelector((state) => state.auth.sendMail);

  const axiosInstance = createAxios(dispatch, currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = { loginValue, password };
    const err = validateLogin(form);
    if (err.numberErrors !== 0) {
      setErrors(err);
    } else {
      setErrors({});
      if (err.email)
        login(dispatch, axiosInstance, { email: loginValue, password });
      else
        login(dispatch, axiosInstance, {
          username: loginValue,
          password,
        });
    }
  };

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      loginGoogle(dispatch, axiosInstance, {
        access_token: tokenResponse.access_token,
      });
    },
  });

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
    }
  }, [dispatch, handleAccessRegister, stateEmail.error, stateEmail.success]);

  useEffect(() => {
    if (error !== "") {
      toast.custom(
        () => <ToastNotify type="error" title="Error" desc={error} />,
        { duration: 2000 }
      );
      dispatch(resetLogin());
    }
  }, [dispatch, error]);

  return (
    <div className={cx("login-wrapper")}>
      <Toaster position="top-right" richColors expand={true} />
      {stateEmail.success === "" ? (
        <div>
          <h2 className={cx("heading")}>Login</h2>
          <form className={cx("form")} onSubmit={handleSubmit}>
            <div className={cx("list-input")}>
              <InputItem
                value={loginValue}
                setValue={setLoginValue}
                placeholder="Username or email *"
                errors={errors.loginValue}
              />
              <div>
                <InputItem
                  type="password"
                  value={password}
                  setValue={setPassword}
                  placeholder="Password *"
                  errors={errors.password}
                />
                <p className={cx("error")}>{error}</p>
              </div>
            </div>
            <div className={cx("footer")}>
              <p className={cx("text")}>
                Forgot your{" "}
                <span
                  className={cx("link")}
                  onClick={handleAccessForgotPassword}
                >
                  password
                </span>
                ?
              </p>
              <button
                type={
                  loginValue === "" || password === "" ? "button" : "submit"
                }
                className={cx("action-login", {
                  "hide-login": loginValue === "" || password === "",
                  "show-login": loginValue !== "" && password !== "",
                })}
              >
                Log In
              </button>
              <p className={cx("text")}>
                Not a member?{" "}
                <span className={cx("link")} onClick={handleAccessRegister}>
                  Sign up
                </span>
              </p>
              <div className={cx("login-google")} onClick={handleLoginGoogle}>
                <img
                  src={images.googleIcon}
                  alt="Google"
                  className={cx("icon")}
                />
                <span className={cx("text")}>Continue with Google</span>
              </div>
            </div>
          </form>

          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={statusLogin}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : (
        <div>
          <CardContainerGoogle />
        </div>
      )}
    </div>
  );
}

export default Login;
