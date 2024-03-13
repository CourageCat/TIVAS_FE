import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
import { useState, useEffect } from "react";
import { createReservation } from "~/controllers/reservationTicket";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { Link, useParams } from "react-router-dom";

import images from "~/assets/images";
// import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Booking({ handleClose, setMessage }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const [code, setCode] = useState("");

    const { id } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await createReservation(axiosInstance, {
            code: code,
            timeShareID: +id,
            userID: currentUser?.data?.id,
        });
        if (res) {
            handleClose();
            setMessage(res);
        }
    };

    return (
        <div className={cx("booking-wrapper")}>
            <form className={cx("content")} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="code" className={cx("text")}>
                        Enter Your Reservation Code Here
                    </label>
                </div>

                <div>
                    <input
                        type="text"
                        value={code}
                        className={cx("input")}
                        placeholder="Enter your code"
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>

                <button type="submit" className={cx("submit-btn")}>
                    Book now
                </button>
            </form>
        </div>
    );
}

export default Booking;
