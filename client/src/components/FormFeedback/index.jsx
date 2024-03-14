import classNames from "classnames/bind";
import styles from "./FormFeedback.module.scss";
import { useState, useEffect } from "react";
import { createReservation } from "~/controllers/reservationTicket";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { Link, useParams } from "react-router-dom";

import images from "~/assets/images";

const cx = classNames.bind(styles);

function FormFeedback() {
    return (
        <div className={cx("wrapper")}>
            <form className={cx("content")}>
                <label htmlFor="desc" className={cx("text")}>
                    Please tell us your feedback!
                </label>
                <textarea
                    name="text"
                    id="desc"
                    cols="50"
                    rows="10"
                    placeholder="Feedback here!"
                    className={cx("desc")}
                />

                <button type="submit" className={cx("submit-btn")}>
                    Submit Feedback
                </button>
            </form>
        </div>
    );
}

export default FormFeedback;
