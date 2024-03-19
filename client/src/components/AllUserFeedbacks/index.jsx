import classNames from "classnames/bind";
import styles from "./AllUserFeedbacks.module.scss";
import images from "~/assets/images";
import Tippy from "@tippyjs/react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Rating, Stack, Pagination } from "@mui/material";
import {
    getAllFeedbacks,
    deleteFeedback,
    updateShowFeedback,
} from "~/controllers/feedback";

import { Toaster, toast } from "sonner";
import ToastNotify from "~/components/ToastNotify";

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

function AllUserFeedbacks() {
    const [listFeedback, setListFeedback] = useState(null);
    const [countPage, setCountPage] = useState(1);
    const [page, setPage] = useState(1);
    const [notify, setNotify] = useState({});
    const [post, setPost] = useState({});
    const [unPost, setUnPost] = useState({});

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

    useEffect(() => {
        if (notify?.err === 0) {
            toast.custom(() => (
                <ToastNotify
                    type="success"
                    title="success"
                    desc="Delete FeedBack successfully"
                />
            ));
        }
    }, [notify]);

    useEffect(() => {
        if (unPost?.err === 0) {
            toast.custom(() => (
                <ToastNotify
                    type="success"
                    title="success"
                    desc="UnPost successfully"
                />
            ));
        }
    }, [unPost]);

    useEffect(() => {
        if (post?.err === 0) {
            toast.custom(() => (
                <ToastNotify
                    type="success"
                    title="success"
                    desc="Post successfully"
                />
            ));
        }
    }, [post]);

    const handleDelete = async (id) => {
        const res = await deleteFeedback(axiosInstance, id);
        setNotify(res);
        handleClose();

        const res_one = await getAllFeedbacks(axiosInstance, {
            page: page,
            limit,
            status: 0,
        });
        setListFeedback(res_one?.data);
        setCountPage(res_one?.countPages);
        if (page < res_one?.countPages) {
            setPage(page);
        } else {
            setPage(res_one?.countPages);
        }
    };

    const handlePost = async (id) => {
        const res = await updateShowFeedback(axiosInstance, id);
        setPost(res);
        handleClose();

        const res_one = await getAllFeedbacks(axiosInstance, {
            page: page,
            limit,
            status: 0,
        });
        setListFeedback(res_one?.data);
        setCountPage(res_one?.countPages);
        if (page < res_one?.countPages) {
            setPage(page);
        } else {
            setPage(res_one?.countPages);
        }
    };

    const handleUnPost = async (id) => {
        const res = await updateShowFeedback(axiosInstance, id);
        setUnPost(res);
        handleClose();

        const res_one = await getAllFeedbacks(axiosInstance, {
            page: page,
            limit,
            status: 0,
        });
        setListFeedback(res_one?.data);
        setCountPage(res_one?.countPages);
        if (page < res_one?.countPages) {
            setPage(page);
        } else {
            setPage(res_one?.countPages);
        }
    };

    useEffect(() => {
        const fetchListing = async () => {
            const res = await getAllFeedbacks(axiosInstance, {
                page: page,
                limit,
                status: 0,
            });

            setListFeedback(res?.data);

            setCountPage(res?.countPages);
        };
        fetchListing();
    }, [page]);

    console.log(listFeedback);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={cx("wrapper")}>
            <Toaster position="top-right" richColors expand={true} />

            <div className={cx("row")}>
                <h1 className={cx("title")}>All User Feedbacks</h1>

                <Tippy content="Show all reservation status" placement="top">
                    <img
                        className={cx("icon")}
                        src={images.importantIcon}
                        alt="Locate Icon"
                    />
                </Tippy>
            </div>

            {!listFeedback ? (
                <div className={cx("empty-wrapper")}>
                    <img
                        src={images.empty}
                        alt="empty"
                        className={cx("empty-img")}
                    />
                </div>
            ) : (
                <div>
                    {listFeedback?.map((item) => (
                        <div className={cx("content")}>
                            <div className={cx("feedback-wrapper")}>
                                <div className={cx("feedback")}>
                                    <div className={cx("feedback-content")}>
                                        <div className={cx("left-feedback")}>
                                            <div className={cx("user-info")}>
                                                <img
                                                    src={item?.User?.avatarURL}
                                                    alt="user-avatar"
                                                    className={cx("avatar")}
                                                />

                                                <h3 className={cx("user-name")}>
                                                    {item?.User?.username}
                                                </h3>
                                            </div>
                                            <p className={cx("text")}>
                                                {item?.content}
                                            </p>

                                            <div className={cx("btn-group")}>
                                                {item?.status === 0 ? (
                                                    <button
                                                        className={cx(
                                                            "btn",
                                                            "post"
                                                        )}
                                                        onClick={() =>
                                                            handlePost(item?.id)
                                                        }
                                                    >
                                                        Publish
                                                    </button>
                                                ) : (
                                                    <button
                                                        className={cx(
                                                            "btn",
                                                            "un-post"
                                                        )}
                                                        onClick={() =>
                                                            handleUnPost(
                                                                item?.id
                                                            )
                                                        }
                                                    >
                                                        Unpublish
                                                    </button>
                                                )}

                                                <button
                                                    className={cx(
                                                        "btn",
                                                        "delete"
                                                    )}
                                                    onClick={() =>
                                                        handleDelete(item?.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {listFeedback && (
                <div className={cx("trow")}>
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
                </div>
            )}
        </div>
    );
}

export default AllUserFeedbacks;
