import classNames from "classnames/bind";
import styles from "./AdminSidebar.module.scss";
import images from "~/assets/images";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const cx = classNames.bind(styles);

function AdminSidebar() {
    const location = useLocation();

    const [user, setUser] = useState(false);
    const [project, setProject] = useState(false);
    const [reservation, setReservation] = useState(false);

    const toggleUser = () => {
        setUser((prev) => !prev);
    };

    const toggleReservation = () => {
        setReservation((prev) => !prev);
    };

    const toggleProject = () => {
        setProject((prev) => !prev);
    };

    return (
        <div className={cx("sidebar-wrapper")}>
            {/* Logo */}
            <section className={cx("logo")}>
                <h1 className={cx("logo-text")}>TIVAS</h1>
            </section>
            {/* List options */}
            <section className={cx("list-options")}>
                {/* Dashboard */}
                <div className={cx("option")}>
                    <div className={cx("parent")}>
                        <div
                            className={cx("heading", {
                                active: location.pathname.includes(
                                    "/dashboard"
                                ),
                            })}
                        >
                            <svg
                                className={cx("icon")}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                            </svg>
                            <h4 className={cx("text")}>Dashboard</h4>
                        </div>
                        {/* <svg
              className={cx("icon-down")}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg> */}
                    </div>

                    <div
                        className={cx("parent", {
                            active: location.pathname === "/admin",
                        })}
                    ></div>
                </div>

                {/* Manage User */}
                <div className={cx("option")}>
                    <div className={cx("parent")} onClick={toggleUser}>
                        <div
                            className={cx("heading", {
                                active: location.pathname.includes(
                                    "/manageuser"
                                ),
                            })}
                        >
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
                            <h4 className={cx("text")}>Manage User</h4>
                        </div>
                        <svg
                            className={cx("icon-down")}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
                    </div>
                    {user === true && (
                        <div className={cx("list-child")}>
                            <Link to="/admin/manageuser/listuser">
                                <div
                                    className={cx("children", {
                                        active: location.pathname.includes(
                                            "/listuser"
                                        ),
                                    })}
                                >
                                    <svg
                                        className={cx("icon")}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                    </svg>
                                    <h4 className={cx("text")}>List user</h4>
                                </div>
                            </Link>

                            <Link to="/admin/manageuser/userfeedbacks">
                                <div
                                    className={cx("children", {
                                        active: location.pathname.includes(
                                            "/userfeedbacks"
                                        ),
                                    })}
                                >
                                    <svg
                                        className={cx("icon")}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                    </svg>
                                    <h4 className={cx("text")}>
                                        User feedbacks
                                    </h4>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Manage Project */}
                <div className={cx("option")}>
                    <div className={cx("parent")} onClick={toggleProject}>
                        <div
                            className={cx("heading", {
                                active: location.pathname.includes(
                                    "/manageproject"
                                ),
                            })}
                        >
                            <svg
                                className={cx("icon")}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                            </svg>
                            <h4 className={cx("text")}>Manage Project</h4>
                        </div>
                        <svg
                            className={cx("icon-down")}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
                    </div>
                    {project === true && (
                        <div className={cx("list-child")}>
                            <Link to="/admin/manageproject/listproject">
                                <div
                                    className={cx("children", {
                                        active: location.pathname.includes(
                                            "/listproject"
                                        ),
                                    })}
                                >
                                    <svg
                                        className={cx("icon")}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                    </svg>
                                    <h4 className={cx("text")}>List project</h4>
                                </div>
                            </Link>

                            <Link to="/admin/manageproject/history">
                                <div
                                    className={cx("children", {
                                        active: location.pathname.includes(
                                            "/history"
                                        ),
                                    })}
                                >
                                    <svg
                                        className={cx("icon")}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                    </svg>
                                    <h4 className={cx("text")}>History</h4>
                                </div>
                            </Link>

                            <Link to="/admin/manageproject/projectinreservation">
                                <div
                                    className={cx("children", {
                                        active: location.pathname.includes(
                                            "/projectinreservation"
                                        ),
                                    })}
                                >
                                    <svg
                                        className={cx("icon")}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                    </svg>
                                    <h4 className={cx("text")}>
                                        List project reservation
                                    </h4>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default AdminSidebar;
