import classNames from "classnames/bind";
import styles from "./Reservation.module.scss";
import { useState } from "react";

// import AdminShowListing from "../AdminShowListing";

import images from "~/assets/images";
import { Link } from "react-router-dom";
import { updateReservation } from "~/controllers/project";

import createAxios from "~/configs/axios";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(styles);

function convertDateFormat(inputDate) {
    const parts = inputDate.split("-");
    const reversedParts = parts.reverse();
    const outputDate = reversedParts.join("/");
    return outputDate;
}

function Reservation({ id, handleClose }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const [reservationDate, setReservationDate] = useState("");
    const [reservationPrice, setReservationPrice] = useState("");
    const [openDate, setOpenDate] = useState("");

    const [closeDate, setCloseDate] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = {
            reservationPrice: +reservationPrice,
            reservationDate: convertDateFormat(reservationDate),
            openDate: convertDateFormat(openDate),
            closeDate: convertDateFormat(closeDate),
        };
        const res = await updateReservation(axiosInstance, id, form);
        if (res?.err === 0) alert("Success");
        else alert("Failure");
        handleClose();
    };

    return (
        <div className={cx("wrapper")}>
            <form className={cx("content")} onSubmit={handleSubmit}>
                <div className={cx("input-compo")}>
                    {/* Reservation Day */}
                    <div className={cx("group")}>
                        <label htmlFor="reservation-day" className={cx("text")}>
                            Reservation Day
                        </label>

                        <input
                            id="reservation-day"
                            type="date"
                            className={cx("input")}
                            placeholder="mm/dd/yyyy"
                            value={reservationDate}
                            onChange={(e) => {
                                setReservationDate(e.target.value);
                            }}
                        />
                    </div>

                    {/* Reservation Price */}
                    <div className={cx("group")}>
                        <label
                            htmlFor="reservation-price"
                            className={cx("text")}
                        >
                            Reservation Price
                        </label>

                        <input
                            id="reservation-price"
                            type="number"
                            className={cx("input")}
                            placeholder="$"
                            value={reservationPrice}
                            onChange={(e) =>
                                setReservationPrice(e.target.value)
                            }
                        />
                    </div>

                    {/* Open Date */}
                    <div className={cx("group")}>
                        <label htmlFor="open-date" className={cx("text")}>
                            Open Date
                        </label>

                        <input
                            id="open-date"
                            type="date"
                            className={cx("input")}
                            placeholder="mm/dd/yyyy"
                            value={openDate}
                            onChange={(e) => setOpenDate(e.target.value)}
                        />
                    </div>

                    {/* Close Day */}
                    <div className={cx("group")}>
                        <label htmlFor="close-day" className={cx("text")}>
                            Close Day
                        </label>

                        <input
                            id="close-day"
                            type="date"
                            className={cx("input")}
                            placeholder="mm/dd/yyyy"
                            value={closeDate}
                            onChange={(e) => {
                                setCloseDate(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <button type="submit" className={cx("submit-btn")}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Reservation;
