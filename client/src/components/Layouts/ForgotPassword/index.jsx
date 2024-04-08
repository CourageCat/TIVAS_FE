import classNames from "classnames/bind";
import styles from "./ForgotPassword.module.scss";
import InputItem from "~/components/InputItem";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Popup from "~/components/AuthPopup";
import { Backdrop, CircularProgress } from "@mui/material";
import ForgotPasswordEmail from "../ForgotPasswordEmail";
import ForgotPasswordForm from "../ForgotPasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { resetForgot } from "~/redux/forgotPasswordSlice";
import ToastNotify from "~/components/ToastNotify";

const cx = classNames.bind(styles);

function ForgotPassword({
  trigger,
  handleAccessLogin,
  handleCloseForgotPassword,
}) {
  const [forgotPath, setForgotPath] = useState(0);

  const stateForgot = useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();

  useEffect(() => {
    if (forgotPath === 0 && stateForgot.sendMailPassword.email !== "") {
      setForgotPath(1);
    }
  }, [forgotPath, stateForgot.sendMailPassword.email]);

  useEffect(() => {
    if (stateForgot.resetPassword.success !== "") {
      toast.custom(
        () => (
          <ToastNotify
            type="success"
            title="Success"
            desc={stateForgot.resetPassword.success}
          />
        ),
        { duration: 2000 }
      );
      dispatch(resetForgot());
      handleCloseForgotPassword();
    } else if (stateForgot.resetPassword.error !== "") {
      toast.custom(
        () => (
          <ToastNotify
            type="error"
            title="Error"
            desc={stateForgot.resetPassword.error}
          />
        ),
        { duration: 2000 }
      );
    }
  }, [dispatch, stateForgot]);

  const renderForgot = () => {
    if (forgotPath === 0) {
      return <ForgotPasswordEmail handleAccessLogin={handleAccessLogin} />;
    } else if (forgotPath === 1) {
      return <ForgotPasswordForm />;
    }
  };

  const handleRegisterPrevious = () => {
    setForgotPath((prev) => prev - 1);
  };

  return (
    <div className={cx("forgot-wrapper")}>
      <Toaster position="top-right" richColors expand={true} />

      <Popup
        trigger={trigger}
        onClose={handleCloseForgotPassword}
        status={forgotPath}
        onPrevious={handleRegisterPrevious}
      >
        {renderForgot()}
      </Popup>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={stateForgot.resetPassword.isFetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default ForgotPassword;
