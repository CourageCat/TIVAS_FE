import classNames from "classnames/bind";
import styles from "./WishList.module.scss";
import images from "~/assets/images";
import Navigations from "~/components/Layouts/Navigations";
import Footer from "~/components/Layouts/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Rating, Stack, Pagination } from "@mui/material";
import { viewWishlist } from "~/controllers/user";
import { deleteWishlist } from "~/controllers/user";

import Tippy from "@tippyjs/react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
const cx = classNames.bind(styles);

const limit = 5;

function WishList({ setNotify }) {
    const [countPage, setCountPage] = useState(1);
    const [page, setPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [wishlistData, setWishlistData] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    useEffect(() => {
        const fetchData = async () => {
            const res = await viewWishlist(axiosInstance, {
                // id: currentUser?.data?.id,
                id: 10,
                page: page,
                limit,
            });

            if (res?.err === 0) {
                setWishlistData(res?.data);
            }
        };
        fetchData();
    }, []);
    console.log(wishlistData);

    const handleDelete = async () => {
        const res = await deleteWishlist(axiosInstance, {
            // userId: currentUser?.data?.id,
            userId: 10,
            projectId: wishlistData?.id,
        });
        setNotify({
            ...res,
            mess: res?.message,
        });
        handleClose();
    };

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className={cx("wrapper")}>
            {/* Header */}
            <header className={cx("header")}>
                <div className={cx("navigation")}>
                    <Navigations />
                </div>
            </header>
            {/* Breadcrumbs */}
            <section className={cx("breadcrumbs")}>
                <div className={cx("row-title")}>
                    <img
                        src={images.heartIcon}
                        alt="heart-icon"
                        className={cx("icon")}
                    />
                    <h1 className={cx("title")}>WishList</h1>
                </div>

                <div className={cx("list-nav")}>
                    <Link to="/" className={cx("nav")}>
                        Home
                    </Link>
                    <span className={cx("nav")}> - </span>
                    <span className={cx("nav", "text")}>Wishlist</span>
                </div>
            </section>
            {/* Main Content */}
            <div className={cx("content-wrapper")}>
                <div className={cx("content")}>
                    <div className={cx("content")}>
                        <div className={cx("ticket-detail-wrapper")}>
                            <div className={cx("ticket-detail")}>
                                <table className={cx("table")}>
                                    <thead className={cx("thead")}>
                                        <tr>
                                            <th
                                                className={cx(
                                                    "column",
                                                    "index"
                                                )}
                                            >
                                                <h4 className={cx("title")}>
                                                    ID
                                                </h4>
                                            </th>
                                            <th
                                                className={cx(
                                                    "project",
                                                    "column"
                                                )}
                                            >
                                                <h4 className={cx("title")}>
                                                    Project
                                                </h4>
                                            </th>

                                            <th
                                                className={cx(
                                                    "sleep",
                                                    "column"
                                                )}
                                            >
                                                <h4 className={cx("title")}>
                                                    Project Name
                                                </h4>
                                            </th>

                                            <th
                                                className={cx("date", "column")}
                                            >
                                                <h4 className={cx("title")}>
                                                    Location
                                                </h4>
                                            </th>
                                            <th
                                                className={cx("date", "column")}
                                            >
                                                <h4 className={cx("title")}>
                                                    Building Status
                                                </h4>
                                            </th>
                                            <th
                                                className={cx("date", "column")}
                                            >
                                                <h4 className={cx("title")}>
                                                    Action
                                                </h4>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className={cx("tbody")}>
                                        {wishlistData?.map((item, index) => (
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
                                                                item?.thumbnailPathUrl
                                                            }
                                                            alt="image_one"
                                                            className={cx(
                                                                "image"
                                                            )}
                                                        />
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
                                                        {item?.name}
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
                                                        {item?.location}
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
                                                        {(item?.buildingStatus ===
                                                            1 &&
                                                            "Up coming") ||
                                                            (item?.buildingStatus ===
                                                                2 &&
                                                                "On going") ||
                                                            (item?.buildingStatus ===
                                                                3 &&
                                                                "Already implemented")}
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
                                                                    "text-item",
                                                                    "remove"
                                                                )}
                                                                onClick={
                                                                    handleDelete
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
                                                                            images.trashIcon
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
                                                                        Remove
                                                                        from
                                                                        wishlist
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
                                        ))}
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
                </div>
            </div>
        </div>
    );
}

export default WishList;
