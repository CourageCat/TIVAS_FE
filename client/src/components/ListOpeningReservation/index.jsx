import classNames from "classnames/bind";
import styles from "./ListOpeningReservation.module.scss";
import React, { useEffect, useState } from "react";
import Navigations from "~/components/Layouts/Navigations";
import Footer from "~/components/Layouts/Footer";
import images from "~/assets/images";
import { Link, useNavigate } from "react-router-dom";

import Search from "~/components/Search";
import { Rating, Stack, Pagination } from "@mui/material";
import { getAllProjectInReservation } from "~/controllers/project";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";

const cx = classNames.bind(styles);

const limit = 6;

function convertToDate(inputDate) {
    const date = new Date(inputDate);

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    const result = monthNames[month] + " " + day + " " + year;
    return result;
}

function ListOpeningReservation() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const [input, setInput] = useState("");
    const [projectInReservation, setProjectInReservation] = useState(null);
    const [countPage, setCountPage] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    useEffect(() => {
        const fetchListing = async () => {
            const res = await getAllProjectInReservation(axiosInstance, {
                page: page,
                limit: 6,
            });

            setProjectInReservation(res?.data);
        };
        fetchListing();
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleNavigate = (id) => {
        navigate(`/projectdetail/${id}`);
    };

    return (
        <div className={cx("destination-wrapper")}>
            {/* Main */}
            <main className={cx("main")}>
                {/* Content */}
                {projectInReservation?.length === 0 ? (
                    <div className={cx("empty-wrapper")}>
                        <img
                            src={images.empty}
                            alt="empty"
                            className={cx("empty-img")}
                        />
                    </div>
                ) : (
                    <section className={cx("body")}>
                        <div className={cx("top-resort")}>
                            {/*Listing Details */}
                            <div className={cx("list-listing")}>
                                <table className={cx("table")}>
                                    <thead className={cx("thead")}>
                                        <tr>
                                            <th
                                                className={cx(
                                                    "project",
                                                    "column"
                                                )}
                                            >
                                                <h4 className={cx("title")}>
                                                    Project
                                                </h4>
                                            </th>

                                            <th
                                                className={cx("date", "column")}
                                            >
                                                <h4 className={cx("title")}>
                                                    Reservation Dates
                                                </h4>
                                            </th>
                                            <th
                                                className={cx(
                                                    "price",
                                                    "column"
                                                )}
                                            >
                                                <h4 className={cx("title")}>
                                                    Reservation Price
                                                </h4>
                                            </th>
                                            <th
                                                className={cx(
                                                    "price",
                                                    "column"
                                                )}
                                            >
                                                <h4 className={cx("title")}>
                                                    Action
                                                </h4>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className={cx("tbody")}>
                                        {projectInReservation?.map(
                                            (item, index) => {
                                                return (
                                                    <tr
                                                        key={index}
                                                        className={cx("trow")}
                                                    >
                                                        <td
                                                            className={cx(
                                                                "project",
                                                                "column"
                                                            )}
                                                        >
                                                            <figure
                                                                className={cx(
                                                                    "infor"
                                                                )}
                                                            >
                                                                <img
                                                                    src={
                                                                        item?.thumbnailPathUrl
                                                                    }
                                                                    alt="image_one"
                                                                    className={cx(
                                                                        "image"
                                                                    )}
                                                                />
                                                                <section
                                                                    className={cx(
                                                                        "box"
                                                                    )}
                                                                >
                                                                    <h3
                                                                        className={cx(
                                                                            "name-project",
                                                                            "text"
                                                                        )}
                                                                    >
                                                                        {
                                                                            item?.name
                                                                        }
                                                                    </h3>
                                                                    <div
                                                                        className={cx(
                                                                            "location"
                                                                        )}
                                                                    >
                                                                        <svg
                                                                            className={cx(
                                                                                "icon"
                                                                            )}
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="16"
                                                                            height="16"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                                        </svg>
                                                                        <span
                                                                            className={cx(
                                                                                "position",
                                                                                "text"
                                                                            )}
                                                                        >
                                                                            {
                                                                                item
                                                                                    ?.Location
                                                                                    ?.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </section>
                                                            </figure>
                                                        </td>

                                                        <td
                                                            className={cx(
                                                                "date",
                                                                "column"
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    "name"
                                                                )}
                                                            >
                                                                {`${convertToDate(
                                                                    item?.reservationDate
                                                                )}`}
                                                            </span>
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                "price",
                                                                "column"
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    "name"
                                                                )}
                                                            >
                                                                {`${Intl.NumberFormat(
                                                                    "en-US",
                                                                    {
                                                                        style: "currency",
                                                                        currency:
                                                                            "USD",
                                                                        minimumFractionDigits: 0,
                                                                        maximumFractionDigits: 0,
                                                                    }
                                                                ).format(
                                                                    item?.reservationPrice
                                                                )}`}
                                                            </span>
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                "date",
                                                                "column"
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    "name"
                                                                )}
                                                            >
                                                                <button
                                                                    className={cx(
                                                                        "btn"
                                                                    )}
                                                                    onClick={() =>
                                                                        handleNavigate(
                                                                            item.id
                                                                        )
                                                                    }
                                                                >
                                                                    View Detail
                                                                </button>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                    {projectInReservation && (
                                        <tfoot className={cx("tfoot")}>
                                            <tr className={cx("trow")}>
                                                <Stack spacing={2}>
                                                    <Pagination
                                                        count={countPage}
                                                        page={page}
                                                        variant="outlined"
                                                        shape="rounded"
                                                        onChange={
                                                            handlePageChange
                                                        }
                                                        className={cx(
                                                            "pagination"
                                                        )}
                                                    />
                                                </Stack>
                                            </tr>
                                        </tfoot>
                                    )}
                                </table>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default ListOpeningReservation;
