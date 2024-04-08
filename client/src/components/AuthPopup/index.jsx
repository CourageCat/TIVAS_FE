import classNames from "classnames/bind";
import styles from "./Popup.module.scss";
import { useEffect, useRef } from "react";

const cx = classNames.bind(styles);

function Popup({
  trigger,
  children,
  onClose,
  onPrevious,
  status = 0,
}) {

  return trigger ? (
    <div className={cx("popup-wrapper")}>
      <div className={cx("popup-inner")}>
        <header className={cx("header")}>
          {status === 0 ? (
            <div></div>
          ) : (
            <div className={cx("previous")} onClick={onPrevious}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
            </div>
          )}
          <div className={cx("close")} onClick={onClose}>
            <svg
              rpl=""
              fill="currentColor"
              height="16"
              icon-name="close-outline"
              viewBox="0 0 20 20"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m18.442 2.442-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558Z"></path>
            </svg>
          </div>
        </header>
        <section className={cx("container")}>{children}</section>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Popup;
