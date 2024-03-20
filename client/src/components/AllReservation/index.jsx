import classNames from "classnames/bind";
import styles from "./AllReservation.module.scss";
// import PurchasedProjectInfo from "~/components/PurchasedProjectInfo";
import images from "~/assets/images";
import Tippy from "@tippyjs/react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Rating, Stack, Pagination } from "@mui/material";
import { getAllTicketByUser } from "~/controllers/reservationTicket";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";

const cx = classNames.bind(styles);

const limit = 5;

// Set Date
function formatDate(dateString) {
    var date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

function AllReservation() {
    const [reservationProject, setReservationProject] = useState([]);
    const [countPage, setCountPage] = useState(1);
    const [page, setPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const handlePageChange = (event, value) => {
        setPage(value);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { status } = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            const res = await getAllTicketByUser(axiosInstance, {
                page: page,
                limit,
                status: status,
                id: currentUser?.data?.id,
            });
            if (res?.err === 0) {
                setReservationProject(res?.data);
                setCountPage(res.countPages);
            } else {
                setReservationProject([]);
                setCountPage(1);
            }
        };
        fetchListing();
    }, [page]);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("row")}>
                <h1 className={cx("title")}>All Reservations</h1>

                <Tippy content="Show all reservation status" placement="top">
                    <img
                        className={cx("icon")}
                        src={images.importantIcon}
                        alt="Locate Icon"
                    />
                </Tippy>
            </div>
            {reservationProject.length === 0 ? (
                <div className={cx("empty-wrapper")}>
                    <img
                        src={images.empty}
                        alt="empty"
                        className={cx("empty-img")}
                    />
                </div>
            ) : (
                <div className={cx("content")}>
                    <div className={cx("ticket-detail-wrapper")}>
                        <div className={cx("ticket-detail")}>
                            <table className={cx("table")}>
                                <thead className={cx("thead")}>
                                    <tr>
                                        <th className={cx("column", "index")}>
                                            <h4 className={cx("title")}>ID</h4>
                                        </th>
                                        <th className={cx("project", "column")}>
                                            <h4 className={cx("title")}>
                                                Project
                                            </h4>
                                        </th>

                                        <th className={cx("sleep", "column")}>
                                            <h4 className={cx("title")}>
                                                TypeRoom
                                            </h4>
                                        </th>

                                        <th className={cx("date", "column")}>
                                            <h4 className={cx("title")}>
                                                Code
                                            </h4>
                                        </th>
                                        <th className={cx("date", "column")}>
                                            <h4 className={cx("title")}>
                                                Status
                                            </h4>
                                        </th>
                                        <th className={cx("date", "column")}>
                                            <h4 className={cx("title")}>
                                                Action
                                            </h4>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={cx("tbody")}>
                                    {reservationProject?.map((item, index) => {
                                        return (
                                            <tr
                                                // key={index}
                                                className={cx("trow")}
                                                // onClick={() => handleNavigate(item.id)}
                                            >
                                                <td
                                                    className={cx(
                                                        "index",
                                                        "column"
                                                    )}
                                                >
                                                    <span
                                                        className={cx(
                                                            "num",
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
                                                    <figure
                                                        className={cx("infor")}
                                                    >
                                                        <img
                                                            src={
                                                                item?.projectThumbnailPathUrl
                                                            }
                                                            alt="image_one"
                                                            className={cx(
                                                                "image"
                                                            )}
                                                        />
                                                        <section
                                                            className={cx(
                                                                "box"
                                                            )}
                                                        >
                                                            <h3
                                                                className={cx(
                                                                    "name-project",
                                                                    "text"
                                                                )}
                                                            >
                                                                {
                                                                    item?.projectName
                                                                }
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
                                                                    {
                                                                        item?.location
                                                                    }
                                                                </span>
                                                            </div>
                                                        </section>
                                                    </figure>
                                                </td>
                                                {/* <td className={cx("unit", "column")}>
                                        <span className={cx("name", "text")}>
                                            cc
                                        </span>
                                    </td> */}

                                                <td
                                                    className={cx(
                                                        "type-room",
                                                        "column"
                                                    )}
                                                >
                                                    <span
                                                        className={cx("name")}
                                                    >
                                                        {item?.typeRoomName ? (
                                                            item?.typeRoomName
                                                        ) : (
                                                            <div
                                                                className={cx(
                                                                    "empty"
                                                                )}
                                                            >
                                                                Empty
                                                            </div>
                                                        )}
                                                    </span>
                                                </td>

                                                <td
                                                    className={cx(
                                                        "date",
                                                        "column"
                                                    )}
                                                >
                                                    <span
                                                        className={cx("name")}
                                                    >
                                                        {item?.code}
                                                    </span>
                                                </td>
                                                <td
                                                    className={cx(
                                                        "date",
                                                        "column"
                                                    )}
                                                >
                                                    <span
                                                        className={cx("name")}
                                                    >
                                                        {item?.status}
                                                    </span>
                                                </td>

                                                <td
                                                    className={cx(
                                                        "date",
                                                        "column"
                                                    )}
                                                >
                                                    <div>
                                                        <Menu
                                                            id="basic-menu"
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={
                                                                handleClose
                                                            }
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
                                                                onClick={
                                                                    handleClose
                                                                }
                                                            >
                                                                Profile
                                                            </MenuItem>
                                                            <MenuItem
                                                                className={cx(
                                                                    "text-item"
                                                                )}
                                                                onClick={
                                                                    handleClose
                                                                }
                                                            >
                                                                My account
                                                            </MenuItem>
                                                            <MenuItem
                                                                className={cx(
                                                                    "text-item"
                                                                )}
                                                                onClick={
                                                                    handleClose
                                                                }
                                                            >
                                                                Logout
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
                                                            onClick={
                                                                handleClick
                                                            }
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
                    </div>
                    <tfoot className={cx("tfoot")}>
                        <tr className={cx("trow")}>
                            <Stack spacing={2}>
                                <Pagination
                                    count={countPage}
                                    page={page}
                                    variant="outlined"
                                    shape="rounded"
                                    onChange={handlePageChange}
                                    className={cx("pagination")}
                                />
                            </Stack>
                        </tr>
                    </tfoot>
                </div>
            )}
        </div>
    );
}

export default AllReservation;
