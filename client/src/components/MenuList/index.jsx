import classNames from "classnames/bind";
import styles from "./MenuList.module.scss";
import { useEffect, useRef } from "react";
import { useState } from "react";
import TippyHeadless from "@tippyjs/react/headless";

import images from "~/assets/images";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function MenuList() {
    return (
        <div className={cx("menu-wrapper")}>
            <div className={cx("content")}>
                <Link to="!#" className={cx("text")}>
                    <p className={cx("item")}>Reservation</p>
                </Link>
                <Link to="!#" className={cx("text")}>
                    <p className={cx("item")}>Reservation</p>
                </Link>
                <Link to="!#" className={cx("text")}>
                    <p className={cx("item")}>Reservation</p>
                </Link>
                <Link to="!#" className={cx("text")}>
                    <p className={cx("item")}>Reservation</p>
                </Link>
            </div>
        </div>
    );
}

export default MenuList;
