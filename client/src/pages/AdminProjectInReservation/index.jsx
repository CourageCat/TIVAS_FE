import classNames from "classnames/bind";
import styles from "./AdminProjectInReservation.module.scss";
import { useRef, useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import Tippy from "@tippyjs/react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import images from "~/assets/images";
import { Link, useNavigate } from "react-router-dom";
import ActionUser from "~/components/ActionUser";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { getAllUsers } from "~/controllers/user";
import { Toaster, toast } from "sonner";
import ToastNotify from "~/components/ToastNotify";
import { getAllProjectReservation } from "~/controllers/project";
import ActionProject from "~/components/ActionProject";
import { Box, CircularProgress } from "@mui/material";
const cx = classNames.bind(styles);

const limit = 5;

function convertToDate(inputDate) {
    const date = new Date(inputDate);

    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    const result = month + "/" + day + "/" + year;
    return result;
}

function AdminManageProject() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const [listProjects, setListProjects] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const [countPage, setCountPage] = useState(1);
    const [notify, setNotify] = useState({});

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getAllProjectReservation(axiosInstance, {
                page: page,
                limit: limit,
            });
            setListProjects(res.data);
            setCountPage(res.countPages);
            setIsLoading(false);
        };
        fetchUser();
        window.scrollTo(0, 0);
    }, [page]);

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

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleAfterClose = (id) => {
        navigate(`/admin/manageproject/ticket/${id}`);
    };

    const handleBeforeClose = (id) => {
        navigate(`/admin/manageproject/beforeclosebooking/${id}`);
    };

    return (
        <div className={cx("wrapper")}>
            <Toaster position="top-right" richColors expand={true} />

            <h1 className={cx("heading")}> Manage projects</h1>
            {isLoading === false && listProjects && (
                <div className={cx("content")}>
                    <div className={cx("list-projects")}>
                        <table className={cx("table")}>
                            <thead className={cx("thead")}>
                                <tr>
                                    <th className={cx("id", "column")}>
                                        <h4 className={cx("title")}>ID</h4>
                                    </th>
                                    <th className={cx("project", "column")}>
                                        <h4 className={cx("title")}>Project</h4>
                                    </th>
                                    <th className={cx("unit", "column")}>
                                        <h4 className={cx("title")}>
                                            Type project
                                        </h4>
                                    </th>
                                    <th className={cx("status", "column")}>
                                        <h4 className={cx("title")}>
                                            Building status
                                        </h4>
                                    </th>
                                    <th className={cx("sleep", "column")}>
                                        <h4 className={cx("title")}>
                                            Sale Status
                                        </h4>
                                    </th>
                                    <th className={cx("date", "column")}>
                                        <h4 className={cx("title")}>
                                            Reservation date
                                        </h4>
                                    </th>
                                    <th className={cx("date", "column")}>
                                        <h4 className={cx("title")}>
                                            Booking date
                                        </h4>
                                    </th>
                                    <th className={cx("action", "column")}>
                                        <h4 className={cx("title")}>Action</h4>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={cx("tbody")}>
                                {listProjects?.map((item, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className={cx("trow")}
                                            // onClick={() => handleNavigate(item.id)}
                                        >
                                            <td className={cx("id", "column")}>
                                                <span
                                                    className={cx(
                                                        "name",
                                                        "text"
                                                    )}
                                                >
                                                    {index + 1}
                                                </span>
                                            </td>
                                            <td
                                                className={cx(
                                                    "project",
                                                    "column"
                                                )}
                                            >
                                                <figure className={cx("infor")}>
                                                    <img
                                                        src={
                                                            item?.thumbnailPathUrl
                                                        }
                                                        alt="image_one"
                                                        className={cx("image")}
                                                    />
                                                    <section
                                                        className={cx("box")}
                                                    >
                                                        <h3
                                                            className={cx(
                                                                "name-project",
                                                                "text"
                                                            )}
                                                        >
                                                            {item?.name}
                                                        </h3>
                                                        <div
                                                            className={cx(
                                                                "location"
                                                            )}
                                                        >
                                                            <svg
                                                                className={cx(
                                                                    "icon"
                                                                )}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                fill="currentColor"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                            </svg>
                                                            <span
                                                                className={cx(
                                                                    "position",
                                                                    "text"
                                                                )}
                                                            >
                                                                {item?.location}
                                                            </span>
                                                        </div>
                                                    </section>
                                                </figure>
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
                                                    {item?.typeOfProject}
                                                </span>
                                            </td>
                                            <td
                                                className={cx(
                                                    "sleep",
                                                    "column"
                                                )}
                                            >
                                                <span className={cx("name")}>
                                                    {item?.buildingStatus ===
                                                        1 && "Up coming"}
                                                    {item?.buildingStatus ===
                                                        2 && "On going"}
                                                    {item?.buildingStatus ===
                                                        3 &&
                                                        "Already implemented"}
                                                </span>
                                            </td>
                                            <td
                                                className={cx(
                                                    "sleep",
                                                    "column"
                                                )}
                                            >
                                                <span className={cx("name")}>
                                                    {item?.status === 0 &&
                                                        "Not reservation"}
                                                    {item?.status === 1 &&
                                                        "Open reservation"}
                                                    {item?.status === 2 &&
                                                        "Open booking"}
                                                    {item?.status === 3 &&
                                                        "Close booking"}
                                                </span>
                                            </td>
                                            <td
                                                className={cx("date", "column")}
                                            >
                                                {item?.reservationDate ===
                                                    null ||
                                                item?.reservationDate === "" ||
                                                item?.openDate === null ||
                                                item?.openDate === "" ? (
                                                    <span
                                                        className={cx("name")}
                                                    >
                                                        Empty
                                                    </span>
                                                ) : (
                                                    <span
                                                        className={cx("name")}
                                                    >
                                                        {`${item?.reservationDate} ${item?.openDate}`}
                                                    </span>
                                                )}
                                            </td>
                                            <td
                                                className={cx(
                                                    "booking-date",
                                                    "column"
                                                )}
                                            >
                                                {item?.openDate === null ||
                                                item?.openDate === "" ||
                                                item?.closeDate === null ||
                                                item?.closeDate === "" ? (
                                                    <span
                                                        className={cx("name")}
                                                    >
                                                        Empty
                                                    </span>
                                                ) : (
                                                    <span
                                                        className={cx("name")}
                                                    >
                                                        {`${item?.openDate} ${item?.closeDate}`}
                                                    </span>
                                                )}
                                            </td>
                                            <td
                                                className={cx("date", "column")}
                                            >
                                                <div>
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            "aria-labelledby":
                                                                "basic-button",
                                                        }}
                                                        className={cx(
                                                            "menu-wrapper"
                                                        )}
                                                    >
                                                        <MenuItem
                                                            className={cx(
                                                                "text-item"
                                                            )}
                                                            onClick={() =>
                                                                handleBeforeClose(
                                                                    item?.id
                                                                )
                                                            }
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "row",
                                                                    "remove"
                                                                )}
                                                            >
                                                                <img
                                                                    src={
                                                                        images.changeIcon
                                                                    }
                                                                    alt="plus-icon"
                                                                    className={cx(
                                                                        "icon"
                                                                    )}
                                                                />
                                                                <div
                                                                    className={cx(
                                                                        "text"
                                                                    )}
                                                                >
                                                                    Before close
                                                                    booking
                                                                </div>
                                                            </div>
                                                        </MenuItem>
                                                        <MenuItem
                                                            className={cx(
                                                                "text-item"
                                                            )}
                                                            onClick={() =>
                                                                handleAfterClose(
                                                                    item?.id
                                                                )
                                                            }
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "row",
                                                                    "after"
                                                                )}
                                                            >
                                                                <img
                                                                    src={
                                                                        images.changeIcon
                                                                    }
                                                                    alt="plus-icon"
                                                                    className={cx(
                                                                        "icon"
                                                                    )}
                                                                />
                                                                <div
                                                                    className={cx(
                                                                        "text"
                                                                    )}
                                                                >
                                                                    After close
                                                                    booking
                                                                </div>
                                                            </div>
                                                        </MenuItem>
                                                    </Menu>
                                                    <Button
                                                        id="basic-button"
                                                        aria-controls={
                                                            open
                                                                ? "basic-menu"
                                                                : undefined
                                                        }
                                                        aria-haspopup="true"
                                                        aria-expanded={
                                                            open
                                                                ? "true"
                                                                : undefined
                                                        }
                                                        onClick={handleClick}
                                                    >
                                                        <svg
                                                            // onClick={toggleOpen}
                                                            className={cx(
                                                                "icon"
                                                            )}
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
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className={cx("paginate")}>
                        <Stack spacing={2}>
                            <Pagination
                                count={countPage}
                                variant="outlined"
                                color="primary"
                                onChange={handlePageChange}
                            />
                        </Stack>
                    </div>
                </div>
            )}
            {isLoading === false && !listProjects && <h4>Empty project</h4>}
            {isLoading === true && (
                <Box
                    sx={{
                        marginTop: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
        </div>
    );
}

export default AdminManageProject;
