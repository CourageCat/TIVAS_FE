import TippyHeadless from "@tippyjs/react/headless";
import styles from "./ActionProject.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { banUserById, getAllUsers, unBanUserById } from "~/controllers/user";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
    closeBookingDate,
    openReservaion,
    putOpenBooking,
    updateBooking,
    updateReservation,
} from "~/controllers/project";
import { refundMoneyTimeshare } from "~/controllers/reservationTicket";
import images from "~/assets/images";

const cx = classNames.bind(styles);

const convertDate = (inputDate) => {
    const parts = inputDate.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}/${month}/${year}`;
};

function convertDateTimeToDate() {
    const inputDateTime = "2003-10-13T17:00:00.000Z";
    const dateObject = new Date(inputDateTime);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function compareDates(date_one, date_two) {
    const dateOne = new Date(date_one);
    const dateTwo = new Date(date_two);

    if (dateOne < dateTwo) {
        return false;
    }
    return true;
}

function ActionProject({
    id,
    status,
    nameProject,
    setNotify,
    resDate,
    resPrice,
    fetchData,
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const [open, setOpen] = useState(false);
    const [openReservation, setOpenReservaion] = useState(false);

    const [openBookingForm, setOpenBookingForm] = useState(false);

    const [reservationPrice, setReservationPrice] = useState("");
    const [reservationDate, setReservationDate] = useState("");
    const [newReservationPrice, setNewReservationPrice] = useState("");
    const [newReservationDate, setNewReservationDate] = useState("");
    const [openDate, setOpenDate] = useState("");
    const [closeDate, setCloseDate] = useState("");

    const [typeBookPriority, setTypeBookPriority] = useState("normal");
    const [isPopupBook, setIsPopupBook] = useState(false);

    const [openNewReservaion, setOpenNewReservaion] = useState(false);

    const handleClickOpenPopupBook = () => {
        handleClose();
        setIsPopupBook(true);
    };

    const handleClosePopupBook = () => {
        setIsPopupBook(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const toggleOpen = () => {
        setOpen((prev) => !prev);
    };

    const handleOpenReservation = () => {
        handleClose();
        setOpenReservaion(true);
        setReservationDate(() =>
            resDate ? convertDateTimeToDate(resDate) : ""
        );
        setReservationPrice(() => (resPrice ? resPrice : ""));
    };

    const handleCloseReservation = () => {
        setOpenReservaion(false);
        setReservationPrice("");
        setReservationDate("");
    };

    const handleNavigate = (value, id) => {
        if (value === "view_project_detail") {
            navigate(`/admin/manageproject/projectdetail/${id}`);
        } else if (value === "create_type_room") {
            navigate(`/admin/manageproject/createtyperoom/${id}`);
        } else if (value === "manage_type_room") {
            navigate(`/admin/manageproject/managetyperoom/${id}`);
        } else if (value === "manage_timeshare") {
            navigate(`/admin/manageproject/managetimeshare/${id}`);
        } else if (value === "manage_user_timeshare") {
            navigate(`/admin/manageuser/ticket/${id}`);
        } else if (value === "statistic") {
            navigate(`/statistic/${id}`);
        }
    };

    const handleUpdateReservation = () => {
        handleClose();
        handleOpenReservation();
    };

    const handleSubmitOpenDateReservation = async (e) => {
        e.preventDefault();

        const form = {
            reservationPrice: status === 0 ? +reservationPrice : resPrice,
            reservationDate:
                status === 0
                    ? reservationDate !== ""
                        ? convertDate(reservationDate)
                        : null
                    : resDate,
        };
        if (!form.reservationPrice || !form.reservationDate) {
            return setNotify({
                err: 1,
                mess: "Please fill in all information",
            });
        }

        const res = await updateReservation(axiosInstance, id, form);
        console.log(res);
        if (res) {
            setNotify({
                ...res,
                mess: res?.message,
            });
        }
        fetchData();
        handleCloseReservation();
    };

    const handleSubmitNewStageOpenDateReservation = async (e) => {
        e.preventDefault();

        const form = {
            reservationPrice: +newReservationPrice,
            reservationDate:
                newReservationDate !== ""
                    ? convertDate(newReservationDate)
                    : null,
        };
        console.log(form.reservationDate);
        if (!form.reservationPrice || !form.reservationDate) {
            return setNotify({
                err: 1,
                mess: "Please fill in all information",
            });
        }

        const res = await updateReservation(axiosInstance, id, form);
        if (res) {
            setNotify({
                ...res,
                mess: res?.message,
            });
        }
        fetchData();
        handleCloseReservation();
    };

    const handleOpenReservationDate = () => {
        if (!resPrice || !resDate) {
            handleClose();
            return setNotify({
                err: 1,
                mess: "Please set reservation date before opening reservation",
            });
        }

        setOpenBookingForm(true);
        handleClose();
    };

    const handleCloseReservaionDate = () => {
        setOpenBookingForm(false);
        setOpenDate("");
        setCloseDate("");
    };

    const handleOpenBookingDate = async () => {
        const res = await putOpenBooking(axiosInstance, id);
        setNotify(res);
        fetchData();
        handleClose();
    };

    const handleCloseBookingDate = async (e) => {
        e.preventDefault();
        const form = {
            id: id,
            type: typeBookPriority,
        };
        const res = await closeBookingDate(axiosInstance, form);
        setNotify(res);
        fetchData();
        handleClosePopupBook();
    };

    const handleSubmitOpenBookingReservation = async (e) => {
        e.preventDefault();
        const form = {
            openDate: openDate !== "" ? convertDate(openDate) : null,
            closeDate: closeDate !== "" ? convertDate(closeDate) : null,
        };
        if (!form.openDate || !form.closeDate) {
            return setNotify({
                err: 1,
                mess: "Please fill in all information",
            });
        }

        if (!compareDates(closeDate, openDate)) {
            return setNotify({
                err: 1,
                mess: "The booking close date must be greater than or equal to the booking opening date",
            });
        }

        const res = await updateBooking(axiosInstance, id, form);
        const res_one = await openReservaion(axiosInstance, id);
        setNotify({
            ...res_one,
        });
        fetchData();
        handleCloseReservaionDate();
    };

    const handleChangeCheckedBook = (e) => {
        setTypeBookPriority(e.target.value);
        console.log(e.target.value);
    };

    const handleOpenNewReservaion = () => {
        setOpenNewReservaion(true);
        handleClose();
    };

    const handleCloseNewReservaion = () => {
        setOpenNewReservaion(false);
        setNewReservationPrice("");
        setNewReservationDate("");
    };

    return (
        <div>
            <TippyHeadless
                visible={open === true}
                interactive
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        <section className={cx("container")}>
                            <div className={cx("list")}>
                                <div
                                    className={cx(
                                        "item",
                                        "view_project_detail"
                                    )}
                                    onClick={() =>
                                        handleNavigate(
                                            "view_project_detail",
                                            id
                                        )
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="m7.646 9.354-3.792 3.792a.5.5 0 0 0 .353.854h7.586a.5.5 0 0 0 .354-.854L8.354 9.354a.5.5 0 0 0-.708 0" />
                                        <path d="M11.414 11H14.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h3.086l-1 1H1.5A1.5 1.5 0 0 1 0 10.5v-7A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-2.086z" />
                                    </svg>
                                    <span className={cx("title")}>
                                        View project detail
                                    </span>
                                </div>
                                <div
                                    className={cx("item", "create_type_room")}
                                    onClick={() =>
                                        handleNavigate("create_type_room", id)
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                                    </svg>
                                    <span className={cx("title")}>
                                        Create type room
                                    </span>
                                </div>
                                <div
                                    className={cx("item", "create_type_room")}
                                    onClick={() =>
                                        handleNavigate("statistic", id)
                                    }
                                >
                                    <img
                                        src={images.statisticIcon}
                                        className={cx("icon")}
                                    />
                                    <span className={cx("title")}>
                                        Statistic project
                                    </span>
                                </div>
                                <div
                                    className={cx("item", "manage_type_room")}
                                    onClick={() =>
                                        handleNavigate("manage_type_room", id)
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5 2h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm9-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1" />
                                    </svg>
                                    <span className={cx("title")}>
                                        Manage type room
                                    </span>
                                </div>
                                {status === 0 && !resDate && (
                                    <div
                                        className={cx(
                                            "item",
                                            "update_reservation"
                                        )}
                                        onClick={handleUpdateReservation}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                                        </svg>
                                        <span className={cx("title")}>
                                            Open date reservation
                                        </span>
                                    </div>
                                )}
                                {status === 0 && resDate && (
                                    <div
                                        className={cx(
                                            "item",
                                            "update_reservation"
                                        )}
                                        onClick={handleUpdateReservation}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                                        </svg>
                                        <span className={cx("title")}>
                                            Edit date reservation
                                        </span>
                                    </div>
                                )}
                                {status === 0 && (
                                    <div
                                        className={cx(
                                            "item",
                                            "open_reservation"
                                        )}
                                        onClick={handleOpenReservationDate}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                                        </svg>
                                        <span className={cx("title")}>
                                            Open reservation
                                        </span>
                                    </div>
                                )}
                                {status === 1 && (
                                    <>
                                        <div
                                            className={cx(
                                                "item",
                                                "open_booking"
                                            )}
                                            onClick={handleOpenBookingDate}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                                <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                                            </svg>
                                            <span className={cx("title")}>
                                                Open booking
                                            </span>
                                        </div>
                                    </>
                                )}
                                {status === 2 && (
                                    <div
                                        className={cx("item", "close_booking")}
                                        onClick={handleClickOpenPopupBook}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                                        </svg>
                                        <span className={cx("title")}>
                                            Close booking
                                        </span>
                                    </div>
                                )}
                                {status === 3 && (
                                    <div
                                        className={cx("item", "close_booking")}
                                        onClick={handleOpenNewReservaion}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                                        </svg>
                                        <span className={cx("title")}>
                                            Open new stage reservaion
                                        </span>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                )}
                onClickOutside={handleClose}
            >
                <svg
                    onClick={toggleOpen}
                    className={cx("icon")}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z" />
                    <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
                    <path d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z" />
                </svg>
            </TippyHeadless>
            <div className={cx("popup")}>
                <Dialog
                    open={openReservation}
                    onClose={handleCloseReservation}
                    PaperProps={{
                        component: "form",
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(
                                formData.entries()
                            );
                            const email = formJson.email;
                            console.log(email);
                            handleCloseReservation();
                        },
                    }}
                >
                    <DialogTitle>
                        <h2 className={cx("heading_popup")}>
                            {status === 0 &&
                                !resDate &&
                                "Open date reservation"}
                            {status === 0 && resDate && "Edit date reservation"}
                        </h2>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <p className={cx("desc_popup")}>
                                Please fill in the information below
                            </p>
                        </DialogContentText>
                        <div className={cx("list-popup")}>
                            <div className={cx("input_popup")}>
                                <label
                                    htmlFor="reservationPrice"
                                    className={cx("label")}
                                >
                                    Reservation price
                                </label>
                                <input
                                    type="number"
                                    placeholder="Currency(USD)"
                                    className={cx("input")}
                                    value={reservationPrice}
                                    onChange={(e) =>
                                        setReservationPrice(e.target.value)
                                    }
                                    id="reservationPrice"
                                />
                            </div>
                            <div className={cx("input_popup")}>
                                <label
                                    htmlFor="reservationDate"
                                    className={cx("label")}
                                >
                                    Reservation date
                                </label>
                                <input
                                    type="date"
                                    className={cx("input")}
                                    value={reservationDate}
                                    onChange={(e) =>
                                        setReservationDate(e.target.value)
                                    }
                                    id="reservationDate"
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={{ fontSize: "1.4rem" }}
                            onClick={handleCloseReservation}
                        >
                            Cancel
                        </Button>
                        <Button
                            style={{ fontSize: "1.4rem" }}
                            type="submit"
                            onClick={handleSubmitOpenDateReservation}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openBookingForm}
                    onClose={handleCloseReservaionDate}
                    PaperProps={{
                        component: "form",
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(
                                formData.entries()
                            );
                            const email = formJson.email;
                            console.log(email);
                            handleCloseReservation();
                        },
                    }}
                >
                    <DialogTitle>
                        <h2 className={cx("heading_popup")}>
                            {status === 0 && resDate && "Open booking"}
                        </h2>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <p className={cx("desc_popup")}>
                                Please fill in the information below
                            </p>
                        </DialogContentText>
                        <div className={cx("list-popup")}>
                            <div className={cx("input_popup")}>
                                <label
                                    htmlFor="openDate"
                                    className={cx("label")}
                                >
                                    Open Booking date
                                </label>
                                <input
                                    type="date"
                                    className={cx("input")}
                                    value={openDate}
                                    onChange={(e) =>
                                        setOpenDate(e.target.value)
                                    }
                                    id="openDate"
                                />
                            </div>
                            <div className={cx("input_popup")}>
                                <label
                                    htmlFor="closeDate"
                                    className={cx("label")}
                                >
                                    Close Booking date
                                </label>
                                <input
                                    type="date"
                                    className={cx("input")}
                                    value={closeDate}
                                    onChange={(e) =>
                                        setCloseDate(e.target.value)
                                    }
                                    id="closeDate"
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={{ fontSize: "1.4rem" }}
                            onClick={handleCloseReservaionDate}
                        >
                            Cancel
                        </Button>
                        <Button
                            style={{ fontSize: "1.4rem" }}
                            type="submit"
                            onClick={handleSubmitOpenBookingReservation}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    fullWidth="sm"
                    maxWidth="sm"
                    open={isPopupBook}
                    onClose={handleClosePopupBook}
                >
                    <DialogTitle>
                        <h2 className={cx("heading_popup")}>Optional sizes</h2>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <p className={cx("desc_popup")}>
                                You can set my maximum width and whether to
                                adapt or not.
                            </p>
                        </DialogContentText>
                        <Box
                            noValidate
                            component="form"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                m: "auto",
                                width: "fit-content",
                            }}
                        >
                            <FormControl sx={{ mt: 2, minWidth: 160 }}>
                                <InputLabel htmlFor="typePriority">
                                    Type priority
                                </InputLabel>
                                <Select
                                    autoFocus
                                    value={typeBookPriority}
                                    onChange={handleChangeCheckedBook}
                                    label="typePriority"
                                    inputProps={{
                                        name: "Type priority",
                                        id: "typePriority",
                                    }}
                                >
                                    <MenuItem value="normal">Normal</MenuItem>
                                    <MenuItem value="random">Random</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{ fontSize: 13 }}
                            onClick={handleClosePopupBook}
                        >
                            Close
                        </Button>
                        <Button
                            sx={{ fontSize: 13 }}
                            onClick={handleCloseBookingDate}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openNewReservaion}
                    onClose={handleCloseNewReservaion}
                    PaperProps={{
                        component: "form",
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(
                                formData.entries()
                            );
                            const email = formJson.email;
                            console.log(email);
                            handleCloseReservation();
                        },
                    }}
                >
                    <DialogTitle>
                        <h2 className={cx("heading_popup")}>
                            New stage reservaion
                        </h2>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <p className={cx("desc_popup")}>
                                Please fill in the information below
                            </p>
                        </DialogContentText>
                        <div className={cx("list-popup")}>
                            <div className={cx("input_popup")}>
                                <label
                                    htmlFor="reservationPrice"
                                    className={cx("label")}
                                >
                                    Reservation price
                                </label>
                                <input
                                    type="number"
                                    placeholder="Currency(USD)"
                                    className={cx("input")}
                                    value={newReservationPrice}
                                    onChange={(e) =>
                                        setNewReservationPrice(e.target.value)
                                    }
                                    id="reservationPrice"
                                />
                            </div>
                            <div className={cx("input_popup")}>
                                <label
                                    htmlFor="reservationDate"
                                    className={cx("label")}
                                >
                                    Reservation date
                                </label>
                                <input
                                    type="date"
                                    className={cx("input")}
                                    value={newReservationDate}
                                    onChange={(e) =>
                                        setNewReservationDate(e.target.value)
                                    }
                                    id="reservationDate"
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={{ fontSize: "1.4rem" }}
                            onClick={handleCloseNewReservaion}
                        >
                            Cancel
                        </Button>
                        <Button
                            style={{ fontSize: "1.4rem" }}
                            type="submit"
                            onClick={handleSubmitNewStageOpenDateReservation}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default ActionProject;
