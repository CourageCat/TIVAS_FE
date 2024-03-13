import classNames from "classnames/bind";
import styles from "./ListProject.module.scss";
import Dialog from "@mui/material/Dialog";
import {
    DialogTitle,
    IconButton,
    DialogContent,
    Button,
    DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import { getAllProject, openReservaion } from "~/controllers/project";
import { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";

// import AdminShowListing from "../AdminShowListing";
import Reservation from "~/components/Reservation";

import images from "~/assets/images";
import { Link } from "react-router-dom";

import createAxios from "~/configs/axios";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(styles);

function ListProject({ status, price, image, name, id, location }) {
    const [open, setOpen] = useState(false);
    const [openReservaionbtn, setOpenReservaionbtn] = useState(false);
    const [click, setClick] = useState(false);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    // const [id, setId] = useState({});

    // const { id } = useParams();

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        "& .MuiDialogContent-root": {
            padding: theme.spacing(2),
        },
        "& .MuiDialogActions-root": {
            padding: theme.spacing(1),
        },
    }));

    // useEffect(() => {
    //     if (open === true) {
    //         setClick(true);
    //     }
    // }, [open]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenReservaion = async (e) => {
        e.preventDefault();
        const res = await openReservaion(axiosInstance, id);
        if (res?.err === 0) alert(true);
        else alert(false);
        setOpenReservaionbtn(false);
    };

    return (
        <div className={cx("project")}>
            {/* <div className={cx("project-info")}> */}
            <div className={cx("project-info")}>
                <img src={image} alt="Avatar" className={cx("img")} />

                <div className={cx("text")}>{name}</div>
                <div className={cx("text")}>{location}</div>
                {/* <div className={cx("text", "up-coming")}>Up Comming</div> */}
                <div className={cx("listing")}>
                    <div>
                        <button
                            type="button"
                            className={cx("booking-btn", "text")}
                            onClick={() => setOpen(true)}
                            disabled={click}
                        >
                            {price ? "Update" : "Reservation"}
                        </button>

                        <div>
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
                                        color: (theme) =>
                                            theme.palette.grey[500],
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <DialogContent dividers>
                                    <Reservation
                                        id={id}
                                        handleClose={handleClose}
                                    />
                                </DialogContent>
                            </BootstrapDialog>
                        </div>
                    </div>
                    {price && (
                        <>
                            <div>
                                {status === 0 ? (
                                    <button
                                        type="option"
                                        onClick={() =>
                                            setOpenReservaionbtn(true)
                                        }
                                    >
                                        Open reservation
                                    </button>
                                ) : (
                                    <p>Opened Reservaion</p>
                                )}
                            </div>
                            <>
                                <Dialog
                                    open={openReservaionbtn}
                                    onClose={() => setOpenReservaionbtn(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Use Google's location service?"}
                                    </DialogTitle>
                                    <DialogContent></DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={() =>
                                                setOpenReservaionbtn(false)
                                            }
                                        >
                                            Disagree
                                        </Button>
                                        <Button onClick={handleOpenReservaion}>
                                            Agree
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        </>
                    )}
                </div>
            </div>
        </div>
        // </div>
    );
}

export default ListProject;