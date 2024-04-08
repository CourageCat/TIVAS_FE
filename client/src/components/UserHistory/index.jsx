import classNames from "classnames/bind";
import styles from "./UserHistory.module.scss";

import HistoryPurchasedSuccess from "~/components/HistoryPurchasedSuccess";
import HistoryPurchasedFail from "~/components/HistoryPurchasedFail";
import HistoryBookedFail from "~/components/HistoryBookedFail";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

import { getAllTicketByUser } from "~/controllers/reservationTicket";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";

import images from "~/assets/images";
import { Link, useNavigate, useParams } from "react-router-dom";
import { stepButtonClasses } from "@mui/material";

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

// const limit = 5;

function UserHistory() {
    const [value, setValue] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    // const { status } = useParams();

    // const handleChange = (event, newValue) => {
    //     navigate(`/user/account/history/${newValue}`);
    // };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab
                        label="Booked Fail"
                        {...a11yProps(0)}
                        className={cx("test")}
                        sx={{
                            fontSize: "1.2rem",
                            fontFamily: "Poppin, sans-serif",
                            minWidth: "250px",
                            fontWeight: "600",
                        }}
                    />
                    <Tab
                        label="Purchased Success"
                        {...a11yProps(1)}
                        className={cx("test")}
                        sx={{
                            fontSize: "1.2rem",
                            fontFamily: "Poppin, sans-serif",
                            minWidth: "250px",
                            fontWeight: "600",
                        }}
                    />
                    <Tab
                        label="Purchased Fail"
                        {...a11yProps(2)}
                        className={cx("test")}
                        sx={{
                            fontSize: "1.2rem",
                            fontFamily: "Poppin, sans-serif",
                            minWidth: "250px",
                            fontWeight: "600",
                        }}
                    />
                </Tabs>
            </Box>
            <div className={cx("wrapper")}>
                <CustomTabPanel value={value} index={0}>
                    <HistoryBookedFail />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <HistoryPurchasedSuccess />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <HistoryPurchasedFail />
                </CustomTabPanel>
            </div>
        </Box>
    );
}

export default UserHistory;
