import classNames from "classnames/bind";
import styles from "./UserBanList.module.scss";

import "tippy.js/dist/tippy.css";
import React, { useState } from "react";

import images from "~/assets/images";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function UserBanList() {
    return (
        <div className={cx("user")}>
            <Link to="#!" className={cx("user-info")}>
                <img src={images.unknown} alt="Avatar" className={cx("img")} />

                <div className={cx("text")}>Bentanik</div>
                <div className={cx("text")}>Nguyễn Mai Viết Vỹ</div>
                <div className={cx("text")}>012345678</div>
                <div className={cx("row")}>
                    <button
                        type="button"
                        onClick={() => {
                            console.log("xin chào");
                        }}
                        className={cx("ban-btn")}
                    >
                        Unban
                    </button>
                </div>
            </Link>
        </div>
    );
}

export default UserBanList;
