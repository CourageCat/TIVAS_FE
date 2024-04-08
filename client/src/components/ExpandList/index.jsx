import classNames from "classnames/bind";
import styles from "./ExpandList.module.scss";

import { useEffect, useState } from "react";
import { getAllLocations } from "~/controllers/location";
import createAxios from "~/configs/axios";

import { useDispatch, useSelector } from "react-redux";

import images from "~/assets/images";
import { Link } from "react-router-dom";
import { LocationDisabled } from "@mui/icons-material";

const cx = classNames.bind(styles);

function ExpandList({ locationDetail }) {
    // const [locationData, setLocationData] = useState([]);

    // const dispatch = useDispatch();
    // const currentUser = useSelector((state) => state.auth.login.user);
    // const axiosInstance = createAxios(dispatch, currentUser);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const resLocation = await getAllLocations(axiosInstance);

    //         if (resLocation?.err === 0) {
    //             setLocationData(resLocation.data);
    //             console.log(locationData);
    //         }
    //     };
    //     fetchData();
    // }, []);

    return (
        <div className={cx("expand-list-wrapper")}>
            <div className={cx("content")}>
                {/* Expand Header */}
                <div className={cx("expand-header-wrapper")}>
                    <div className={cx("expand-header")}>
                        <img
                            className={cx("list-icon")}
                            src={images.listIcon}
                            alt="List Icon"
                        />
                        <p className={cx("list-header")}>All locations</p>
                    </div>
                </div>
                {/* List Content */}
                <div className={cx("list-content-wrapper")}>
                    <div className={cx("list-content")}>
                        <div className={cx("scroll-content")}>
                            {locationDetail?.map((item, index) => (
                                <Link
                                    to={`/search/type=location&value=${item?.name}`}
                                    key={index}
                                >
                                    <span className={cx("desc")}>
                                        {item?.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpandList;
