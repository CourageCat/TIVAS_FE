import classNames from "classnames/bind";
import styles from "./AdminHistoryAllUserBuyTimeshare.module.scss";
import { useRef, useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import images from "~/assets/images";
import ActionUser from "~/components/ActionUser";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { getAllUserPurchaseTimeshare } from "~/controllers/timeshare";
import { Toaster, toast } from "sonner";
import ToastNotify from "~/components/ToastNotify";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
const cx = classNames.bind(styles);

const limit = 10;

function AdminHistoryAllUserBuyTimeshare() {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const [listUsers, setListUsers] = useState(null);
    const [countPage, setCountPage] = useState(1);

    const [page, setPage] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getAllUserPurchaseTimeshare(axiosInstance, {
                id: id,
                page: page,
                limit: limit,
            });
            setListUsers(res?.data);
            console.log(res?.data);
            setCountPage(res?.countPages);
        };
        fetchUser();
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("title")}> Manage User</h1>
            {listUsers?.length !== 0 ? (
                <div className={cx("content")}>
                    <div className={cx("list-user")}>
                        <table className={cx("table")}>
                            <thead className={cx("thead")}>
                                <tr>
                                    <th className={cx("avatar", "column")}>
                                        <h4 className={cx("title")}>Avatar</h4>
                                    </th>
                                    <th className={cx("username", "column")}>
                                        <h4 className={cx("title")}>
                                            Username
                                        </h4>
                                    </th>
                                    <th className={cx("fullName", "column")}>
                                        <h4 className={cx("title")}>
                                            Full Name
                                        </h4>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={cx("tbody")}>
                                {listUsers?.map((item, index) => {
                                    return (
                                        <tr key={index} className={cx("trow")}>
                                            <td
                                                className={cx(
                                                    "avatar",
                                                    "column"
                                                )}
                                            >
                                                <figure className={cx("infor")}>
                                                    <img
                                                        src={item?.avatarURL}
                                                        alt="image_one"
                                                        className={cx("image")}
                                                    />
                                                </figure>
                                            </td>
                                            <td
                                                className={cx(
                                                    "username",
                                                    "column"
                                                )}
                                            >
                                                <span
                                                    className={cx(
                                                        "name",
                                                        "text"
                                                    )}
                                                >
                                                    {item?.username}
                                                </span>
                                            </td>
                                            <td
                                                className={cx(
                                                    "fullName",
                                                    "column"
                                                )}
                                            >
                                                <span className={cx("name")}>
                                                    {item?.fullName}
                                                </span>
                                            </td>
                                            <td
                                                className={cx(
                                                    "email",
                                                    "column"
                                                )}
                                            >
                                                <span className={cx("name")}>
                                                    {item?.email}
                                                </span>
                                            </td>
                                            <td
                                                className={cx(
                                                    "phoneNumber",
                                                    "column"
                                                )}
                                            >
                                                <span className={cx("name")}>
                                                    {item?.phoneNumber}
                                                </span>
                                            </td>
                                            <td
                                                className={cx(
                                                    "typeLogin",
                                                    "column"
                                                )}
                                            >
                                                <span className={cx("name")}>
                                                    {item?.type}
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
            ) : (
                <div className={cx("empty-wrapper")}>
                    <img
                        src={images.empty}
                        alt="empty"
                        className={cx("empty-img")}
                    />
                </div>
            )}
        </div>
    );
}

export default AdminHistoryAllUserBuyTimeshare;
