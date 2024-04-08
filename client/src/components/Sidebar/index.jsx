import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Link, useLocation } from "react-router-dom";
import images from "~/assets/images";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { useEffect, useState } from "react";
import { getAvatarUser } from "~/controllers/user";
const cx = classNames.bind(styles);

function Sidebar() {
    const location = useLocation();

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const [imgAvatar, setImgAvatar] = useState("");

    useEffect(() => {
        const fetchGetAvatarUser = async () => {
            const res = await getAvatarUser(
                axiosInstance,
                currentUser?.data?.username
            );
            if (res) setImgAvatar(res.data.avatarURL);
            else setImgAvatar("");
        };
        fetchGetAvatarUser();
        // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    }, [currentUser]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("avatar")}>
                <img src={imgAvatar} alt="Avatar" className={cx("img")} />
                <div className={cx("min")}>
                    <h4 className={cx("heading")}>
                        {currentUser?.data?.username}
                    </h4>
                    <Link to="/user/account/profile" className={cx("text")}>
                        Edit profile
                    </Link>
                </div>
            </div>
            {/* Option */}
            <div className={cx("list-option")}>
                <div className={cx("option")}>
                    <span className={cx("op-icon")}>
                        <svg
                            className={cx("icon")}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                    </span>
                    <span className={cx("text")}>My account</span>
                </div>
                {location.pathname.includes("account") && (
                    <>
                        <div
                            className={cx("option", "chilrent", {
                                active: location.pathname.includes("profile"),
                            })}
                        >
                            <Link to="/user/account/profile">
                                <span className={cx("text")}>Profile</span>
                            </Link>
                        </div>
                        {currentUser?.data?.type === "Local" && (
                            <div
                                className={cx("option", "chilrent", {
                                    active: location.pathname.includes(
                                        "changepassword"
                                    ),
                                })}
                            >
                                <Link to="/user/account/changepassword">
                                    <span className={cx("text")}>
                                        Change password
                                    </span>
                                </Link>
                            </div>
                        )}
                        <div
                            className={cx("option", "chilrent", {
                                active: location.pathname.includes("banking"),
                            })}
                        >
                            <Link to="/user/account/banking">
                                <span className={cx("text")}>Banking</span>
                            </Link>
                        </div>
                    </>
                )}
                <div
                    className={cx("option", {
                        active: location.pathname.includes("purchase"),
                    })}
                >
                    <span className={cx("op-icon")}>
                        <svg
                            className={cx("icon")}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                        </svg>
                    </span>
                    <Link to="/user/account/purchase/0">
                        <span className={cx("text")}>Purchase order</span>
                    </Link>
                </div>

                <div
                    className={cx("option", {
                        active: location.pathname.includes("history"),
                    })}
                >
                    <img
                        src={images.historyIcon}
                        alt="history-icon"
                        className={cx("icon")}
                    />
                    <Link to="/user/account/history">
                        <span className={cx("text")}>History</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
