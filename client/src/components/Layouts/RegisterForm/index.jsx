import classNames from "classnames/bind";
import styles from "./RegisterForm.module.scss";
import InputItem from "~/components/InputItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register as validateRegister } from "~/middlewares/Validates/validateForm";
import { checkUsername } from "~/controllers/auth";
import createAxios from "~/configs/axios";
import { saveValue } from "~/redux/formRegisterSlice";

const cx = classNames.bind(styles);

function RegisterForm() {
  const dispatch = useDispatch();

  const formRegister = useSelector((state) => state.formRegister.formValue);
  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const email = sessionStorage.getItem("emailRegister") || "";
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErros] = useState({});
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const err = validateRegister({
      fullName,
      username,
      password,
      confirmPassword,
    });
    if (err.numberErrors !== 0) {
      setErros(err);
    } else {
      setErros({});
      // setError()
      const check = await checkUsername(axiosInstance, { username });
      if (check?.err === 1) {
        setError(check?.mess);
      } else {
        setError("");
        dispatch(saveValue({ fullName, username, password, phoneNumber }));
      }
    }
  };

  useEffect(() => {
    if (formRegister) {
      setFullName(formRegister.fullName);
      setUsername(formRegister.username);
      setPassword(formRegister.password);
      setPhoneNumber(formRegister.phoneNumber);
      setConfirmPassword(formRegister.password);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx("login-wrapper")}>
      <h2 className={cx("heading")}>Sign up</h2>
      <form className={cx("form")} onSubmit={handleSubmit}>
        <div className={cx("list-input")}>
          <InputItem
            type="text"
            value={email}
            placeholder="Email address *"
            readOnly={true}
          />
          <InputItem
            type="text"
            value={username}
            setValue={setUsername}
            placeholder="User Name *"
            error={error}
          />
          <InputItem
            type="text"
            value={fullName}
            setValue={setFullName}
            placeholder="Full Name *"
          />
          <InputItem
            type="text"
            value={phoneNumber}
            setValue={setPhoneNumber}
            placeholder="Phone Number *"
          />
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
            errors={errors.confirmPassword}
          />
        </div>
        <div className={cx("footer")}>
          <button
            type={
              username === "" ||
              fullName === "" ||
              phoneNumber === "" ||
              password === "" ||
              confirmPassword === ""
                ? "button"
                : "submit"
            }
            className={cx("action-login", {
              "hide-login":
                username === "" ||
                fullName === "" ||
                phoneNumber === "" ||
                password === "" ||
                confirmPassword === "",
              "show-login":
                username !== "" &&
                fullName !== "" &&
                phoneNumber !== "" &&
                password !== "" &&
                confirmPassword !== "",
            })}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
