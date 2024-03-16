import classNames from "classnames/bind";
import styles from "./ToastNotify.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const ICON = {
  success: <FontAwesomeIcon icon={faCheckCircle} />,
  error: <FontAwesomeIcon icon={faExclamationCircle} />,
  warning: <FontAwesomeIcon icon={faWarning} />,
};

function ToastNotify({ type, title, desc }) {
  return (
    <div
      className={cx("alert-wrapper", {
        success: type === "success",
        error: type === "error",
        warning: type === "warning",
      })}
    >
      <div className={cx("icon")}>{ICON[type]}</div>
      <div className={cx("content")}>
        <h3 className={cx("title")}>{title}</h3>
        <p className={cx("desc")}>{desc}</p>
      </div>
    </div>
  );
}

export default ToastNotify;
