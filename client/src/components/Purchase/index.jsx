import classNames from "classnames/bind";
import styles from "./Purchase.module.scss";

import PurchasedProject from "~/components/PurchasedProject";
import TimeshareBooked from "~/components/TimeshareBooked";
import BookedSuccess from "~/components/BookedSuccess";
import PurchasedSuccess from "~/components/PurchasedSuccess";
import PurchasedFail from "~/components/PurchasedFail";
import AllReservation from "~/components/AllReservation";
import BookedFail from "~/components/BookedFail";

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

function Purchase() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const { status } = useParams();

  const handleChange = (event, newValue) => {
    navigate(`/user/account/purchase/${newValue}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={+status}
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
              minWidth: "150px",
              fontWeight: "600",
            }}
          />
          <Tab
            label="Reservation Project"
            {...a11yProps(1)}
            className={cx("test")}
            sx={{
              fontSize: "1.2rem",
              fontFamily: "Poppin, sans-serif",
              minWidth: "199px",
              fontWeight: "600",
            }}
          />
          <Tab
            label="Timeshare Booked"
            {...a11yProps(2)}
            className={cx("test")}
            sx={{
              fontSize: "1.2rem",
              fontFamily: "Poppin, sans-serif",
              minWidth: "199px",
              fontWeight: "600",
            }}
          />
          <Tab
            label="Booked Success"
            {...a11yProps(3)}
            className={cx("test")}
            sx={{
              fontSize: "1.2rem",
              fontFamily: "Poppin, sans-serif",
              minWidth: "150px",
              fontWeight: "600",
            }}
          />
          <Tab
            label="Booked Fail"
            {...a11yProps(4)}
            className={cx("test")}
            sx={{
              fontSize: "1.2rem",
              fontFamily: "Poppin, sans-serif",
              minWidth: "150px",
              fontWeight: "600",
            }}
          />
          <Tab
            label="Purchased Success"
            {...a11yProps(5)}
            className={cx("test")}
            sx={{
              fontSize: "1.2rem",
              fontFamily: "Poppin, sans-serif",
              minWidth: "199px",
              fontWeight: "600",
            }}
          />
          <Tab
            label="Purchased Fail"
            {...a11yProps(6)}
            className={cx("test")}
            sx={{
              fontSize: "1.2rem",
              fontFamily: "Poppin, sans-serif",
              minWidth: "150px",
              fontWeight: "600",
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={+status} index={0}>
        <AllReservation />
      </CustomTabPanel>
      <CustomTabPanel value={+status} index={1}>
        <PurchasedProject />
      </CustomTabPanel>
      <CustomTabPanel value={+status} index={2}>
        <TimeshareBooked />
      </CustomTabPanel>
      <CustomTabPanel value={+status} index={3}>
        <BookedSuccess />
      </CustomTabPanel>
      <CustomTabPanel value={+status} index={4}>
        <BookedFail />
      </CustomTabPanel>
      <CustomTabPanel value={+status} index={5}>
        <PurchasedSuccess />
      </CustomTabPanel>
      <CustomTabPanel value={+status} index={6}>
        <PurchasedFail />
      </CustomTabPanel>
    </Box>
  );
}

export default Purchase;
