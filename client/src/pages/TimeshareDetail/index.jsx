import classNames from "classnames/bind";
import styles from "./TimeshareDetail.module.scss";
import Navigations from "~/components/Layouts/Navigations";
import RoomType from "~/components/RoomType";
import SimpleGallery from "../ProjectDetail/simplegallery";
import "photoswipe/style.css";
import { Link, useParams } from "react-router-dom";
import images from "~/assets/images";
import Booking from "~/components/Booking";

import Dialog from "@mui/material/Dialog";
import { DialogTitle, IconButton, DialogContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import Footer from "~/components/Layouts/Footer";
import { useState, useEffect } from "react";
import { getTimeshareDetailById } from "~/controllers/timeshare";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { Toaster, toast } from "sonner";
import ToastNotify from "~/components/ToastNotify";

const cx = classNames.bind(styles);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function TimeshareDetail() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState({});
    const [timeshareData, setTimeshareData] = useState({});
    const [typeRoomData, setTypeRoomData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [listImage, setListImage] = useState([]);
    const [amenities, setAmenities] = useState([]);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const { id } = useParams();

    useEffect(() => {
        if (message?.err === 1) {
            toast.custom(
                () => (
                    <ToastNotify
                        type="error"
                        title="Error"
                        desc={message?.message}
                    />
                ),
                { duration: 2000 }
            );
        } else if (message?.err === 0) {
            toast.custom(
                () => (
                    <ToastNotify
                        type="success"
                        title="Success"
                        desc={message?.message}
                    />
                ),
                { duration: 2000 }
            );
        }
    }, [message]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getTimeshareDetailById(axiosInstance, id);
            console.log(res);
            if (res?.err === 0) {
                setProjectData(res.data.Project);
                setListImage(res.data.TypeRoom.images);
                setTypeRoomData(res.data.TypeRoom);
                setTimeshareData(res.data.TimeShare);
                setAmenities(res.data.TypeRoom.amenities);
            }

            if (projectData.status !== 2) {
            }
        };
        fetchData();
    }, []);

    const image = listImage.map((item) => {
        return {
            largeURL: item.pathUrl,
            thumbnailURL: item.pathUrl,
            width: 974,
            height: 641,
        };
    });

    // Set Date
    function formatDate(dateString) {
        var date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    }

    var formattedStartDate = formatDate(timeshareData.startDate);
    var formattedEndDate = formatDate(timeshareData.endDate);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={cx("timeshare-detail-wrapper")}>
            <Toaster position="top-right" richColors expand={true} />
            <div>
                {/* Header */}
                <header className={cx("header")}>
                    {/* Navigations */}
                    <section className={cx("navigation")}>
                        <Navigations />
                    </section>
                </header>

                <div className={cx("content")}>
                    <h1 className={cx("main-title")}>{projectData.name}</h1>

                    {/* List Image */}
                    <div className={cx("list-img")}>
                        <SimpleGallery
                            galleryID="my-test-gallery"
                            images={image}
                        />
                    </div>

                    <div className={cx("content-info")}>
                        {/* Left Content */}
                        <div className={cx("left-content")}>
                            <div className={cx("bedroom-detail")}>
                                <h2 className={cx("type-name")}>
                                    {typeRoomData.name}
                                </h2>
                                <div className={cx("row-wrapper")}>
                                    <div className={cx("bedroom", "row")}>
                                        <img
                                            className={cx("icon")}
                                            src={images.bedIcon}
                                            alt="bed-icon"
                                        />
                                        <div className={cx("text")}>
                                            {typeRoomData.bedrooms} Bedroom
                                        </div>
                                    </div>

                                    <div className={cx("guests", "row")}>
                                        <img
                                            className={cx("icon")}
                                            src={images.personIcon}
                                            alt="person-icon"
                                        />
                                        <div className={cx("text")}>
                                            {typeRoomData.persons} Guests
                                        </div>
                                    </div>
                                    <div className={cx("area", "row")}>
                                        <img
                                            className={cx("icon")}
                                            src={images.areaIcon}
                                            alt="area-icon"
                                        />
                                        <div className={cx("text")}>
                                            {typeRoomData.size} Sq Ft
                                        </div>
                                    </div>

                                    <div className={cx("bedroom", "row")}>
                                        <img
                                            className={cx("icon")}
                                            src={images.bedIcon}
                                            alt="bed-icon"
                                        />
                                        <div className={cx("text")}>
                                            {typeRoomData.bedTypes}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className={cx("amenities")}>
                                <h3 className={cx("title")}>Unit Amenites</h3>

                                <div className={cx("list-amenities")}>
                                    {amenities.map((item, index) => (
                                        <div key={index} className={cx("item")}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Unit Desciption */}
                            <div className={cx("unit-desc")}>
                                <h3 className={cx("title")}>
                                    Unit Description
                                </h3>
                                <div
                                    className={cx("desc")}
                                    dangerouslySetInnerHTML={{
                                        __html: typeRoomData.description,
                                    }}
                                ></div>
                            </div>
                        </div>
                        {/* Right Content */}
                        <div className={cx("right-content")}>
                            <div className={cx("booking-info")}>
                                {/* <div className={cx("price")}>
                                    {timeshareData.price}$
                                    <span className={cx("text")}>Total</span>
                                </div> */}

                                <div className={cx("dates")}>
                                    <div className={cx("text-dates", "text")}>
                                        DATES
                                    </div>
                                    <div className={cx("dates-detail", "text")}>
                                        {formattedStartDate} -{" "}
                                        {formattedEndDate}
                                    </div>
                                </div>

                                <div className={cx("total", "row-booking")}>
                                    <div className={cx("text")}>Total:</div>
                                    <div className={cx("price")}>
                                        {Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        })
                                            .format(timeshareData?.price)
                                            .replace(".00", "")}
                                    </div>
                                </div>

                                <div className={cx("note")}>
                                    <p className={cx("text")}>
                                        <span className={cx("bold")}>
                                            Attention:{" "}
                                        </span>{" "}
                                        Please read the rules below carefully
                                        for better understanding before
                                        participating
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className={cx("booking-btn", "text")}
                                    onClick={() => {
                                        timeshareData?.saleStatus === 1 &&
                                            setOpen(true);
                                    }}
                                >
                                    {timeshareData?.saleStatus === 1
                                        ? "Book Now"
                                        : "Not Open"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className={cx("footer")}>
                    <Footer />
                </footer>
            </div>
            <>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle
                        sx={{ m: 0, p: 2 }}
                        id="customized-dialog-title"
                    >
                        Booking
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Booking
                            handleClose={handleClose}
                            setMessage={setMessage}
                        />
                    </DialogContent>
                </BootstrapDialog>
            </>
        </div>
    );
}

export default TimeshareDetail;
