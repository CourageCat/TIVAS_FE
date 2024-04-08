import classNames from "classnames/bind";
import styles from "./ProjectDetail.module.scss";
import Navigations from "~/components/Layouts/Navigations";
import RoomType from "~/components/RoomType";
import SimpleGallery from "../ProjectDetail/simplegallery";
import "photoswipe/style.css";
import { Link, useParams } from "react-router-dom";
import Tippy from "@tippyjs/react";

import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";

import Footer from "~/components/Layouts/Footer";
import { useState, useEffect } from "react";
import { getProjectDetailById } from "~/controllers/project";
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
import { addWishList, checkWishList, deleteWishlist } from "~/controllers/user";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const cx = classNames.bind(styles);

function ProjectDetail() {
    const [projectData, setProjectData] = useState({});
    const [typeRooms, setTypeRooms] = useState([]);
    const [listImage, setListImage] = useState([]);
    const [status, setStatus] = useState(0);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();
    const [openReservaion, setOpenReservaion] = useState(false);
    const [notify, setNotify] = useState({});

    const [checked, setChecked] = useState(false);

    const handleOpenReservaion = () => {
        if (!currentUser) {
            toast.custom(
                () => (
                    <ToastNotify
                        type="warning"
                        title="Warning"
                        desc="Please log in before booking"
                    />
                ),
                { duration: 2000 }
            );
        } else {
            setOpenReservaion(true);
        }
    };

    const handleCloseReservaion = () => {
        setOpenReservaion(false);
    };
    const handlePaymentReservaion = async () => {
        try {
            handleCloseReservaion();
            const response = await paymentReservaion(axiosInstance, {
                amount: projectData?.reservationPrice,
                username: currentUser?.data?.username,
            });
            if (response.err === 0) {
                await createTicket(axiosInstance, {
                    userID: currentUser?.data?.id,
                    projectID: projectData.id,
                });
            }
            // console.log(response);
            setNotify(response);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const projectDetail = async () => {
            const res = await getProjectDetailById(axiosInstance, id);
            if (res?.err === 0) {
                setProjectData(res.data.Project);
                setTypeRooms(res.data.TypeRoom);
                setListImage(
                    res.data.Project.images.map((item) => {
                        return {
                            largeURL: item.pathUrl,
                            thumbnailURL: item.pathUrl,
                            width: 974,
                            height: 641,
                        };
                    })
                );

                setStatus(res.data.Project.status);
                setIsLoading(true);
            }
            if (currentUser) {
                const res_wishList = await checkWishList(axiosInstance, {
                    id: currentUser?.data?.id,
                    projectID: id,
                });
                setChecked(res_wishList?.data);
            }
        };
        projectDetail();
    }, [currentUser]);

    const [scrollToResortAmenities, setScrollToResortAmenities] =
        useState(false);
    useEffect(() => {
        if (scrollToResortAmenities) {
            const resortAmenitiesElement =
                document.getElementById("resort-amenities");
            if (resortAmenitiesElement) {
                resortAmenitiesElement.scrollIntoView({ behavior: "smooth" });
            }

            setScrollToResortAmenities(false);
        }
    }, [scrollToResortAmenities]);

    useEffect(() => {
        if (notify?.err === 1) {
            toast.custom(() => (
                <ToastNotify type="error" title="Error" desc={notify?.mess} />
            ));
            setNotify({});
        } else if (notify?.err === 0) {
            toast.custom(() => (
                <ToastNotify
                    type="success"
                    title="Success"
                    desc={notify?.mess}
                />
            ));
            setNotify({});
        }
    }, [notify]);

    const handleSeeAllClick = () => {
        setScrollToResortAmenities(true);
    };

    const renderTypeRoom = () => {
        return typeRooms.map((item, index) => (
            <RoomType key={index} data={item} />
        ));
    };

    const handleChangeChecked = async (event) => {
        if (!currentUser) {
            return toast.custom(() => (
                <ToastNotify
                    type="warning"
                    title="Warning"
                    desc="Please log in"
                />
            ));
        }
        setChecked(event.target.checked);

        const form = {
            id: currentUser?.data?.id,
            projectID: id,
        };
        if (event.target.checked === true) {
            await addWishList(axiosInstance, form);

            return toast.custom(() => (
                <ToastNotify
                    type="success"
                    title="success"
                    desc="Added to wishlist"
                />
            ));
        } else {
            await deleteWishlist(axiosInstance, form);

            return toast.custom(() => (
                <ToastNotify
                    type="success"
                    title="success"
                    desc="Removed from wishlist"
                />
            ));
        }
    };

    return (
        <div className={cx("project-detail-wrapper")}>
            <Toaster position="top-right" richColors expand={true} />

            {isLoading === true && (
                <div>
                    {/* Header */}
                    <header className={cx("header")}>
                        {/* Navigations */}
                        <section className={cx("navigation")}>
                            <Navigations />
                        </section>
                    </header>
                    <div className={cx("content-wrapper")}>
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
                                        <div className={cx("title-wrapper")}>
                                            <h1 className={cx("title")}>
                                                {/* The Rivus Project from Thu Duc district, Ho Chi Minh */}
                                                {projectData?.name}
                                            </h1>
                                            <Tippy
                                                content="Show all reservation status"
                                                placement="top"
                                            >
                                                <div className={cx("icon")}>
                                                    <Checkbox
                                                        {...label}
                                                        icon={
                                                            <FavoriteBorder />
                                                        }
                                                        checked={
                                                            currentUser
                                                                ? checked
                                                                : false
                                                        }
                                                        onChange={
                                                            handleChangeChecked
                                                        }
                                                        checkedIcon={
                                                            <Favorite />
                                                        }
                                                        sx={{
                                                            "& .MuiSvgIcon-root":
                                                                {
                                                                    fontSize: 28,
                                                                },
                                                            color: "#fe2c55ff",
                                                            "&.Mui-checked": {
                                                                color: "#fe2c55ff",
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </Tippy>
                                        </div>

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
                                                {projectData?.location}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Reservation */}
                                    {status === 1 && (
                                        <div className={cx("reservation")}>
                                            <div
                                                className={cx("action")}
                                                onClick={handleOpenReservaion}
                                            >
                                                Reservation
                                            </div>
                                            <Dialog
                                                open={openReservaion}
                                                onClose={handleCloseReservaion}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle>
                                                    <h3
                                                        className={cx(
                                                            "title-reservation"
                                                        )}
                                                    >
                                                        {`Are you sure you want to reserve project ${projectData?.name}?`}
                                                    </h3>
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        <p
                                                            className={cx(
                                                                "desc-reservation"
                                                            )}
                                                        >
                                                            {`Price reservation: ${Intl.NumberFormat(
                                                                "en-US",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "USD",
                                                                }
                                                            ).format(
                                                                projectData?.reservationPrice
                                                            )}`}
                                                        </p>
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button
                                                        style={{
                                                            fontSize: "1.2rem",
                                                        }}
                                                        onClick={
                                                            handleCloseReservaion
                                                        }
                                                    >
                                                        Disagree
                                                    </Button>
                                                    <Button
                                                        style={{
                                                            fontSize: "1.2rem",
                                                        }}
                                                        onClick={
                                                            handlePaymentReservaion
                                                        }
                                                    >
                                                        Agree
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={cx("desc")}
                                    dangerouslySetInnerHTML={{
                                        __html: projectData?.description,
                                    }}
                                ></div>

                                <div className={cx("rate")}>
                                    <div className={cx("rating")}>4.5</div>
                                    <h2 className={cx("sub-title")}>
                                        Excellent Value
                                    </h2>
                                </div>

                                <div className={cx("amenities")}>
                                    <div className={cx("row")}>
                                        <h2 className={cx("sub-title")}>
                                            Popular amenities
                                        </h2>
                                        <Link
                                            to="#resort-amenities"
                                            className={cx("text-wrapper")}
                                            onClick={handleSeeAllClick}
                                        >
                                            See All
                                        </Link>
                                    </div>

                                    {/* List Amenities */}
                                    <div className={cx("list-amenities")}>
                                        <div className={cx("left-list")}>
                                            {projectData?.features
                                                ?.slice(0, 3)
                                                .map((item, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={cx(
                                                                "item"
                                                            )}
                                                        >
                                                            {item}
                                                        </div>
                                                    );
                                                })}
                                        </div>

                                        <div className={cx("right-list")}>
                                            {projectData?.features
                                                ?.slice(3, 6)
                                                .map((item, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={cx(
                                                                "item"
                                                            )}
                                                        >
                                                            {item}
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Room Type */}
                            <div className={cx("all-room-type")}>
                                <h1 className={cx("title")}>Room Type</h1>
                                <div>{renderTypeRoom()}</div>
                            </div>

                            {/* Timeshare Rental Button */}
                            <div className={cx("btn-wrapper")}>
                                <div className={cx("header")}>
                                    Timeshare rental
                                </div>
                                <div className={cx("content")}>
                                    {/* left content */}
                                    <div className={cx("left-content")}>
                                        <img
                                            src={images.unknown}
                                            alt="avatar"
                                            className={cx("avatar")}
                                        />
                                        <div className={cx("text")}>
                                            Do you want to view all timeshare
                                            rentals ?
                                        </div>
                                    </div>

                                    {/* right content */}
                                    <div className={cx("right-content")}>
                                        <Link
                                            to={`/timesharerentals/${id}`}
                                            className={cx("rental-link")}
                                        >
                                            <div className={cx("rental-btn")}>
                                                Timeshare Rental
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Resort Amenities */}
                            <div className={cx("resort-amenities-wrapper")}>
                                <h1
                                    id={cx("resort-amenities")}
                                    className={cx("title")}
                                >
                                    Resort Amenities
                                </h1>
                                <div className={cx("resort-amenities-list")}>
                                    {projectData?.features?.map(
                                        (item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={cx("item")}
                                                >
                                                    {item}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                            {/* Attractions */}
                            <div className={cx("resort-amenities-wrapper")}>
                                <h1
                                    id={cx("resort-amenities")}
                                    className={cx("title")}
                                >
                                    Nearby Attractions
                                </h1>
                                <div className={cx("resort-amenities-list")}>
                                    {projectData?.attractions?.map(
                                        (item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={cx("item")}
                                                >
                                                    {item}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* List Image */}

                    {/* Footer */}
                    <footer className={cx("footer")}>
                        <Footer />
                    </footer>
                </div>
            )}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={!isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default ProjectDetail;
