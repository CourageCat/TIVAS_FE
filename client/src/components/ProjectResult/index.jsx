import classNames from "classnames/bind";
import styles from "./ProjectResult.module.scss";

import images from "~/assets/images";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function ProjectResult({
    image,
    name,
    location,
    features,
    openDate,
    closeDate,
    reservationDate,
    reservationPrice,
}) {
    const [showReservation, setShowReservation] = useState(false);
    // Check Reservation
    useEffect(() => {
        if (openDate) {
            setShowReservation(false);
        }
    }, []);

    function formatDate(dateString) {
        var date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    }

    var formattedStartDate = formatDate(openDate);
    var formattedEndDate = formatDate(closeDate);
    var formattedReservation = formatDate(reservationDate);

    return (
        <Link to="#!">
            <div className={cx("project-result")}>
                <div className={cx("content")}>
                    {/* Left Content */}
                    <div className={cx("left-content")}>
                        {/* Thumb Project */}

                        <img
                            className={cx("thumb-project")}
                            src={image}
                            alt="Thumb Project "
                        />
                    </div>

                    {/* Right Content */}
                    <div className={cx("right-content")}>
                        <h1 className={cx("project-name")}>{name}</h1>

                        {/* Locate Row */}
                        <div className={cx("row-locate")}>
                            <img
                                className={cx("locate-icon")}
                                src={images.locateIcon}
                                alt="Locate Icon"
                            />
                            <p className={cx("desc")}>{location}</p>
                        </div>
                        {/* Utilities Row */}
                        <div className={cx("row-utilities")}>
                            <div className={cx("row")}>
                                {" "}
                                {features.slice(0, 3).map((item) => (
                                    <div className={cx("desc")}>{item}</div>
                                ))}
                            </div>

                            {/* <div className={cx("row")}>
                                <img
                                    className={cx("right-arrow")}
                                    src={images.rightArrow}
                                    alt="Right Arrow"
                                />
                            </div> */}
                        </div>

                        {openDate ? (
                            <div className={cx("group-row")}>
                                {/* Open & Close Date */}
                                <div className={cx("group-date")}>
                                    {/* Open Date */}
                                    <div className={cx("date", "text")}>
                                        OpenDate:{" "}
                                        <span className={cx("text")}>
                                            {formattedStartDate}
                                        </span>
                                    </div>
                                    {/* Close Date */}
                                    <div className={cx("date", "text")}>
                                        CloseDate:{" "}
                                        <span className={cx("text")}>
                                            {formattedEndDate}
                                        </span>
                                    </div>
                                </div>
                                {/* Reservation Group */}
                                <div className={cx("reservation-group")}>
                                    <div className={cx("reservation", "text")}>
                                        Reservation Price:{" "}
                                        <span className={cx("text")}>
                                            {reservationPrice} $
                                        </span>
                                    </div>

                                    <div className={cx("reservation", "text")}>
                                        Reservation Day:{" "}
                                        <span className={cx("text")}>
                                            {formattedReservation}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={cx("up-coming")}>Up Coming !</div>
                        )}
                        {/* 
                        {/* Detail */}
                        {/* <div className={cx("detail")}>
                                <p className={cx("desc")}>Detail</p>

                                <img
                                    className={cx("right-arrow")}
                                    src={images.rightArrow}
                                    alt="Right Arrow"
                                />
                            </div> */}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProjectResult;
