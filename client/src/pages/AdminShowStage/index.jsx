import classNames from "classnames/bind";
import styles from "./AdminShowStage.module.scss";
import { useRef, useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import images from "~/assets/images";
import { Link, useNavigate, useParams } from "react-router-dom";
import ActionUser from "~/components/ActionUser";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { getAllUsers } from "~/controllers/user";
import { Toaster, toast } from "sonner";
import ToastNotify from "~/components/ToastNotify";
import {
    getProjectDetailById,
    getAllSoldReservation,
} from "~/controllers/project";
import ActionProject from "~/components/ActionProject";
const cx = classNames.bind(styles);

const limit = 5;

function convertToDate(inputDate) {
    const date = new Date(inputDate);

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    const result = monthNames[month] + " " + day + " " + year;
    return result;
}

function AdminShowStage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const [projectDetail, setProjectDetail] = useState([]);
    const [soldReservation, setSoldReservation] = useState([]);

    const [countPage, setCountPage] = useState(1);
    const [notify, setNotify] = useState({});

    const [page, setPage] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getProjectDetailById(axiosInstance, id);
            const resSoldReservation = await getAllSoldReservation(
                axiosInstance,
                {
                    page: page,
                    projectID: id,
                    limit,
                }
            );
            setSoldReservation(resSoldReservation?.data);
            console.log(resSoldReservation?.data);
            setProjectDetail(res?.data);
            setCountPage(resSoldReservation?.countPages);
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

    const handleNavigate = (id) => {
        navigate(`/timesharedetail/${id}`);
    };

    return (
        <div className={cx("wrapper")}>
            <Toaster position="top-right" richColors expand={true} />

            <h1 className={cx("heading")}> Manage projects</h1>

            <div className={cx("content")}>
                <div className={cx("project-detail")}>
                    <div className={cx("project-info")}>
                        <img
                            src={projectDetail?.Project?.thumbnailPathUrl}
                            alt="thumbnail"
                            className={cx("thumb")}
                        />
                        <div className={cx("info")}>
                            <h2 className={cx("name")}>
                                {projectDetail?.Project?.name}
                            </h2>
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
                                <span className={cx("position")}>
                                    {projectDetail?.Project?.location}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("list-projects")}>
                    <table className={cx("table")}>
                        <thead className={cx("thead")}>
                            <tr>
                                <th className={cx("id", "column")}>
                                    <h4 className={cx("title")}>ID</h4>
                                </th>
                                <th className={cx("project", "column")}>
                                    <h4 className={cx("title")}>Date</h4>
                                </th>
                                <th className={cx("status", "column")}>
                                    <h4 className={cx("title")}>
                                        Reservation Date
                                    </h4>
                                </th>
                                <th className={cx("sleep", "column")}>
                                    <h4 className={cx("title")}>Open Date</h4>
                                </th>
                                <th className={cx("date", "column")}>
                                    <h4 className={cx("title")}>Close Date</h4>
                                </th>
                            </tr>
                        </thead>
                        <tbody className={cx("tbody")}>
                            {soldReservation?.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className={cx("trow")}
                                        // onClick={() => handleNavigate(item.id)}
                                    >
                                        <td className={cx("id", "column")}>
                                            <span
                                                className={cx("name", "text")}
                                            >
                                                {index + 1}
                                            </span>
                                        </td>
                                        <td
                                            className={cx(
                                                "booking-date",
                                                "column"
                                            )}
                                        >
                                            <span className={cx("name")}>
                                                {item?.date
                                                    ? item?.date
                                                    : "Empty"}
                                            </span>
                                        </td>

                                        <td className={cx("sleep", "column")}>
                                            <span className={cx("name")}>
                                                {item?.reservationDate
                                                    ? item?.reservationDate
                                                    : "empty"}
                                            </span>
                                        </td>
                                        <td className={cx("date", "column")}>
                                            <span className={cx("name")}>
                                                {item?.openDate
                                                    ? item?.openDate
                                                    : "Empty"}
                                            </span>
                                        </td>
                                        <td
                                            className={cx(
                                                "booking-date",
                                                "column"
                                            )}
                                        >
                                            <span className={cx("name")}>
                                                {item?.closeDate
                                                    ? item?.closeDate
                                                    : " Empty"}
                                            </span>
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
        </div>
    );
}

export default AdminShowStage;
