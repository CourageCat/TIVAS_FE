import classNames from "classnames/bind";
import styles from "./ListingDetails.module.scss";
import React, { useEffect, useState } from "react";
import Navigations from "~/components/Layouts/Navigations";
import Footer from "~/components/Layouts/Footer";
import images from "~/assets/images";
import { Link, useNavigate } from "react-router-dom";

import ListOpeningTimeshare from "~/components/ListOpeningTimeshare";
import ListOpeningReservation from "~/components/ListOpeningReservation";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Search from "~/components/Search";
import { Rating, Stack, Pagination } from "@mui/material";
import { getAllTimeshare } from "~/controllers/timeshare";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";

const cx = classNames.bind(styles);

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

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

function ListingDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const [input, setInput] = useState("");
    const [listingResort, setListingResort] = useState(null);
    const [countPage, setCountPage] = useState(1);
    const [page, setPage] = useState(1);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // useEffect(() => {
    //     const fetchListing = async () => {
    //         const res = await getAllTimeshare(axiosInstance, { page: page });
    //         setListingResort(res.data);
    //         console.log(res.data);
    //         setCountPage(res.countPages);
    //     };
    //     fetchListing();
    // }, [page]);

    // const handleChange = (event, newValue) => {
    //     navigate(`/user/account/purchase/${newValue}`);
    // };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <h1 className={cx("title")}>Listings</h1>
                <div className={cx("list-nav")}>
                    <Link to="/" className={cx("nav")}>
                        Home
                    </Link>
                    <span className={cx("nav")}> - </span>
                    <span className={cx("nav", "text")}>Listings</span>
                </div>
            </section>
            <div className={cx("tab-wrapper")}>
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab
                                label="Opening Timeshare"
                                {...a11yProps(0)}
                                className={cx("test")}
                                sx={{
                                    fontSize: "1.2rem",
                                    fontFamily: "Poppin, sans-serif",
                                    minWidth: "150px",
                                    fontWeight: "600",
                                }}
                            />
                            <Tab
                                label="Opening Reservation"
                                {...a11yProps(1)}
                                className={cx("test")}
                                sx={{
                                    fontSize: "1.2rem",
                                    fontFamily: "Poppin, sans-serif",
                                    minWidth: "199px",
                                    fontWeight: "600",
                                }}
                            />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <ListOpeningTimeshare />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <ListOpeningReservation />
                    </CustomTabPanel>
                </Box>
            </div>

            <Footer />
        </div>
    );
}

export default ListingDetails;
