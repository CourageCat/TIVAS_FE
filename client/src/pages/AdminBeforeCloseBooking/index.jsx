import classNames from "classnames/bind";
import styles from "./AdminManageUserTicket.module.scss";

import AdminAllAllocated from "~/pages/AdminAllAllocated";
import AdminReserved from "~/pages/AdminReserved";
import AdminBooked from "~/pages/AdminBooked";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

import createAxios from "~/configs/axios";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";

import images from "~/assets/images";
import { stepButtonClasses } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

const limit = 5;

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

function AdminBeforeCloseBooking() {
    const [value, setValue] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

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
                        label="All"
                        {...a11yProps(0)}
                        className={cx("test")}
                        sx={{
                            fontSize: "1.2rem",
                            fontFamily: "Poppin, sans-serif",
                            minWidth: "200px",
                            fontWeight: "600",
                        }}
                    />
                    <Tab
                        label="Reserved"
                        {...a11yProps(1)}
                        className={cx("test")}
                        sx={{
                            fontSize: "1.2rem",
                            fontFamily: "Poppin, sans-serif",
                            minWidth: "200px",
                            fontWeight: "600",
                        }}
                    />
                    <Tab
                        label="Booked"
                        {...a11yProps(2)}
                        className={cx("test")}
                        sx={{
                            fontSize: "1.2rem",
                            fontFamily: "Poppin, sans-serif",
                            minWidth: "200px",
                            fontWeight: "600",
                        }}
                    />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <AdminAllAllocated />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <AdminReserved />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <AdminBooked />
            </CustomTabPanel>
        </Box>
    );
}

export default AdminBeforeCloseBooking;
