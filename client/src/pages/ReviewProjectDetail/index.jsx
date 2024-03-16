import classNames from "classnames/bind";
import styles from "./ProjectDetail.module.scss";
import Navigations from "~/components/Layouts/Navigations";
import RoomType from "~/components/RoomType";
import SimpleGallery from "./simplegallery";
import "photoswipe/style.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import Footer from "~/components/Layouts/Footer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import {
    Backdrop,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import {
    createTicket,
    paymentReservaion,
} from "~/controllers/reservationTicket";
import { Toaster, toast } from "sonner";
import ToastNotify from "~/components/ToastNotify";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function ReviewProjectDetail() {
    const [listImage, setListImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const form = useSelector((state) => state.reviewProjectDetail.form);

    useEffect(() => {
        if (form === null) {
            navigate("/admin/createproject");
        }
        setListImage(
            [form.form?.thumbNail, ...form?.form?.listImage]?.map((item) => {
                return {
                    largeURL: item?.preview,
                    thumbnailURL: item?.preview,
                    width: 974,
                    height: 641,
                };
            })
        );
    }, [form]);
    console.log(form?.form);
    return (
        <div className={cx("project-detail-wrapper")}>
            <div>
                {/* Header */}
                <header className={cx("header")}>
                    {/* Navigations */}
                    <section className={cx("navigation")}>
                        <Navigations />
                    </section>
                </header>
                {/* List Image */}
                <div className={cx("content")}>
                    <div className={cx("list-img")}>
                        <SimpleGallery
                            galleryID="my-test-gallery"
                            images={listImage}
                        />
                    </div>
                </div>

                <div className={cx("content")}>
                    <div className={cx("info-detail")}>
                        <div className={cx("top-content")}>
                            <div className={cx("left")}>
                                <h1 className={cx("title")}>
                                    {form?.form?.projectName}
                                </h1>

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

                                    <span className={cx("text")}>
                                        {form?.form?.location}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className={cx("desc")}
                            dangerouslySetInnerHTML={{
                                __html: form?.form?.desc,
                            }}
                        ></div>

                        <div className={cx("rate")}>
                            <div className={cx("rating")}>4.5</div>
                            <h2 className={cx("sub-title")}>Excellent Value</h2>
                        </div>

                        <div className={cx("amenities")}>
                            <div className={cx("row")}>
                                <h2 className={cx("sub-title")}>
                                    Popular amenities
                                </h2>
                            </div>

                            {/* List Amenities */}
                            <div className={cx("list-amenities")}>
                                <div className={cx("left-list")}>
                                    {form?.form?.features
                                        ?.slice(0, 3)
                                        .map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={cx("item")}
                                                >
                                                    {item}
                                                </div>
                                            );
                                        })}
                                </div>

                                <div className={cx("right-list")}>
                                    {form?.form?.features
                                        ?.slice(3, 6)
                                        .map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={cx("item")}
                                                >
                                                    {item}
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resort Amenities */}
                    <div className={cx("resort-amenities-wrapper")}>
                        <h1 id={cx("resort-amenities")} className={cx("title")}>
                            Resort Amenities
                        </h1>
                        <div className={cx("resort-amenities-list")}>
                            {form?.form?.features?.map((item, index) => {
                                return (
                                    <div key={index} className={cx("item")}>
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Attractions */}
                    <div className={cx("resort-amenities-wrapper")}>
                        <h1 id={cx("resort-amenities")} className={cx("title")}>
                            Nearby Attractions
                        </h1>
                        <div className={cx("resort-amenities-list")}>
                            {form?.form?.attractions?.map((item, index) => {
                                return (
                                    <div key={index} className={cx("item")}>
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <footer className={cx("footer")}>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}

export default ReviewProjectDetail;
