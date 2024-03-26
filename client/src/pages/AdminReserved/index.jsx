import classNames from "classnames/bind";
import styles from "./AdminReserved.module.scss";
// import PurchasedProjectInfo from "~/components/PurchasedProjectInfo";
import images from "~/assets/images";
import Tippy from "@tippyjs/react";

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Rating, Stack, Pagination } from "@mui/material";
import { getAllTicketByAdmin } from "~/controllers/reservationTicket";

import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { completeBooking, rejectBooking } from "~/controllers/booking";
import ToastNotify from "~/components/ToastNotify";
import { Toaster, toast } from "sonner";

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

function AdminReserved() {
    const [listTicket, setListTicket] = useState([]);
    const [countPage, setCountPage] = useState(1);
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const [notify, setNotify] = useState({});

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

    const { id } = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            const res = await getAllTicketByAdmin(axiosInstance, {
                status: 2,
                page: page,
                id: id,
                limit,
            });

            if (res?.err === 0) {
                setListTicket(res?.data);
                console.log(res?.data);
                setCountPage(res?.countPages);
            } else {
                setListTicket([]);
                setCountPage(1);
            }
        };
        fetchListing();
    }, [page]);

    return (
        <div className={cx("wrapper")}>
            <Toaster position="top-right" richColors expand={true} />

            <div className={cx("row")}>
                <h1 className={cx("title")}>Reserved</h1>

                <Tippy
                    content="Show all timeshare you purchased success"
                    placement="top"
                >
                    <img
                        className={cx("icon")}
                        src={images.importantIcon}
                        alt="Locate Icon"
                    />
                </Tippy>
            </div>
            {listTicket.length === 0 ? (
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
                                                User Name
                                            </h4>
                                        </th>
                                        <th className={cx("date", "column")}>
                                            <h4 className={cx("title")}>
                                                Date
                                            </h4>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={cx("tbody")}>
                                    {listTicket?.map((item, index) => {
                                        return (
                                            <tr
                                                key={index}
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

                                                <td
                                                    className={cx(
                                                        "type-room",
                                                        "column"
                                                    )}
                                                >
                                                    <span
                                                        className={cx("name")}
                                                    >
                                                        {item?.typeRoomName
                                                            ? item?.typeRoomName
                                                            : "Empty"}
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
                                                        {item?.username}
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
                                                        {formatDate(
                                                            item?.startDate
                                                        )}{" "}
                                                        -{" "}
                                                        {formatDate(
                                                            item?.endDate
                                                        )}
                                                    </span>
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

export default AdminReserved;
