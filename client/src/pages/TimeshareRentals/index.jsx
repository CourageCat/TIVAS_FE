import classNames from "classnames/bind";
import styles from "./TimeshareRentals.module.scss";
import React, { useEffect, useState } from "react";
import Navigations from "~/components/Layouts/Navigations";
import Footer from "~/components/Layouts/Footer";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import SearchPage from "~/components/SearchPage";
import Slider from "react-slick";
import Search from "~/components/Search";
import { Pagination, Stack } from "@mui/material";
import {
    getAllTimeshare,
    getTimeshareByProjectID,
} from "~/controllers/timeshare";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";

const cx = classNames.bind(styles);

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

function TimeshareRentals() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const { id } = useParams();

    const [listingResort, setListingResort] = useState(null);

    const [countPage, setCountPage] = useState(1);
    const [page, setPage] = useState(1);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleNavigate = (value, id) => {
        if (value === "view_book") {
            navigate(`/timesharedetail/${id}`);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchListing = async () => {
            const res = await getTimeshareByProjectID(axiosInstance, id, {
                page: page,
            });
            setListingResort(res?.data);
            console.log(res.data);
            setCountPage(res?.countPages);
        };
        fetchListing();
    }, [page]);

    return (
        <div className={cx("destination-wrapper")}>
            {/* Header */}
            <header className={cx("header")}>
                <div className={cx("navigation")}>
                    <Navigations />
                </div>
            </header>
            {/* Breadcrumbs */}
            <section className={cx("breadcrumbs")}>
                <h1 className={cx("title")}>List Timeshare</h1>
                <div className={cx("list-nav")}>
                    <Link to="/" className={cx("nav")}>
                        Home
                    </Link>
                    <span className={cx("nav")}> - </span>
                    <span className={cx("nav", "text")}>List timeshare</span>
                </div>
            </section>
            {/* Main */}
            {listingResort && (
                <main className={cx("main")}>
                    <div className={cx("project")}>
                        <img
                            src={
                                listingResort[0]?.TypeRoom?.TypeOfProject
                                    ?.Project?.thumbnailPathUrl
                            }
                            alt="img"
                            className={cx("image")}
                        />
                        <div>
                            <h3 className={cx("name")}>
                                {
                                    listingResort[0]?.TypeRoom?.TypeOfProject
                                        ?.Project?.name
                                }
                            </h3>
                            <div className={cx("location")}>
                                <svg
                                    className={cx("icon")}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                </svg>
                                <span className={cx("position")}>
                                    {
                                        listingResort[0]?.TypeRoom
                                            ?.TypeOfProject?.Project?.Location
                                            ?.name
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    {/*Listing Details */}
                    <div className={cx("list-listing")}>
                        <table className={cx("table")}>
                            <thead className={cx("thead")}>
                                <tr>
                                    <th className={cx("date", "column")}>
                                        <h4 className={cx("title")}>DATES</h4>
                                    </th>
                                    <th className={cx("price", "column")}>
                                        <h4 className={cx("title")}>PRICE</h4>
                                    </th>
                                    <th className={cx("unit", "column")}>
                                        <h4 className={cx("title")}>UNIT</h4>
                                    </th>
                                    <th className={cx("sleep", "column")}>
                                        <h4 className={cx("title")}>SLEEPS</h4>
                                    </th>
                                    <th className={cx("sleep", "column")}>
                                        {/* <h4 className={cx("title")}></h4> */}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={cx("tbody")}>
                                {listingResort?.map((item, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className={cx("trow")}
                                            // onClick={() => handleNavigate(item.id)}
                                        >
                                            <td
                                                className={cx("date", "column")}
                                            >
                                                <span className={cx("name")}>
                                                    {`${convertToDate(
                                                        item?.startDate
                                                    )} - ${convertToDate(
                                                        item?.endDate
                                                    )}`}
                                                </span>
                                            </td>
                                            <td
                                                className={cx(
                                                    "price",
                                                    "column"
                                                )}
                                            >
                                                <span className={cx("name")}>
                                                    {`${Intl.NumberFormat(
                                                        "en-US",
                                                        {
                                                            style: "currency",
                                                            currency: "USD",
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0,
                                                        }
                                                    ).format(item?.price)}`}
                                                </span>
                                            </td>
                                            <td
                                                className={cx("unit", "column")}
                                            >
                                                <span
                                                    className={cx(
                                                        "name",
                                                        "text"
                                                    )}
                                                >
                                                    {item?.TypeRoom?.name}
                                                </span>
                                            </td>
                                            <td
                                                className={cx(
                                                    "sleep",
                                                    "column"
                                                )}
                                            >
                                                <span className={cx("name")}>
                                                    {item?.TypeRoom?.persons}
                                                </span>
                                            </td>
                                            <td
                                                className={cx(
                                                    "sleep",
                                                    "column"
                                                )}
                                            >
                                                <div
                                                    className={cx("btn")}
                                                    onClick={() =>
                                                        handleNavigate(
                                                            "view_book",
                                                            item?.TypeRoom?.id
                                                        )
                                                    }
                                                >
                                                    VIEW BOOK
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot className={cx("tfoot")}>
                                <tr className={cx("trow")}>
                                    <Stack spacing={2}>
                                        <Pagination
                                            count={countPage}
                                            page={page}
                                            variant="outlined"
                                            shape="rounded"
                                            onChange={handlePageChange}
                                            className={cx("pagination")}
                                        />
                                    </Stack>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </main>
            )}
            <Footer />
        </div>
    );
}

export default TimeshareRentals;
