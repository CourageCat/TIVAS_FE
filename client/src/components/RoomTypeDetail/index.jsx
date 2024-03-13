import classNames from "classnames/bind";
import styles from "./RoomTypeDetail.module.scss";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function CustomNextArrow(props) {
    const { onClick } = props;
    return (
        <div className={cx("slick-btn", "slick-next")} onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
            >
                <path d="M1 1L7 7L1 13" stroke="currentColor" />
            </svg>
        </div>
    );
}

function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
        <div className={cx("slick-btn", "slick-prev")} onClick={onClick}>
            <svg
                className={cx("icon")}
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
            >
                <path d="M7 1L1 7L7 13" stroke="currentColor" />
            </svg>
        </div>
    );
}

const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
};

const item = [
    "Wi-Fi Internet Access",
    "Jetted Tub",
    "In Room Safe",
    "Washer & Dryer",
];

function RoomTypeDetail({ data, listImages }) {
    const renderRoomTypeDetail = () => {
        return listImages.map((item, index) => {
            return (
                <div key={index}>
                    <div className={cx("box")}>
                        <img
                            src={item.pathUrl}
                            alt=""
                            className={cx("image")}
                        />
                    </div>
                </div>
            );
        });
    };
    return (
        <div className={cx("room-type-detail-wrapper")}>
            <div className={cx("main-content")}>
                {/* List box */}
                <div className={cx("list-box")}>
                    <Slider {...settings}>{renderRoomTypeDetail()}</Slider>
                </div>
                {/* Bedroom Detail */}
                <div className={cx("content")}>
                    <div className={cx("bedroom-detail")}>
                        <h2 className={cx("type-name")}>{data.name}</h2>
                        {/* First Row */}
                        <div className={cx("row-wrapper")}>
                            <div className={cx("bathroom", "row")}>
                                <img
                                    className={cx("icon")}
                                    src={images.bathIcon}
                                    alt="bed-icon"
                                />
                                <div className={cx("text")}>
                                    {data.bathrooms} Bathrooms
                                </div>
                            </div>

                            <div className={cx("guests", "row")}>
                                <img
                                    className={cx("icon")}
                                    src={images.personIcon}
                                    alt="person-icon"
                                />
                                <div className={cx("text")}>
                                    {data.persons} Guests
                                </div>
                            </div>
                            <div className={cx("area", "row")}>
                                <img
                                    className={cx("icon")}
                                    src={images.areaIcon}
                                    alt="area-icon"
                                />
                                <div className={cx("text")}>
                                    {data.size} Sq Ft
                                </div>
                            </div>

                            <div className={cx("bedroom", "row")}>
                                <img
                                    className={cx("icon")}
                                    src={images.bedIcon}
                                    alt="bed-icon"
                                />
                                <div className={cx("text")}>
                                    {data.bedrooms} Room
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className={cx("amenities")}>
                        <h3 className={cx("title")}>Unit Amenites: </h3>

                        <div className={cx("list-amenities")}>
                            {/* Left List */}
                            <div className={cx("left-list")}>
                                {item.map((item, index) => (
                                    <div key={index} className={cx("item")}>
                                        {item}
                                    </div>
                                ))}
                            </div>

                            {/* Between List */}
                            <div className={cx("between-list")}>
                                {item.map((item, index) => (
                                    <div key={index} className={cx("item")}>
                                        {item}
                                    </div>
                                ))}
                            </div>

                            {/* Right List */}
                            <div className={cx("right-list")}>
                                {item.map((item, index) => (
                                    <div key={index} className={cx("item")}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Unit Desciption */}
                    <div className={cx("unit-desc")}>
                        <h3 className={cx("title")}>Unit Description: </h3>
                        <div className={cx("desc")}>{data?.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomTypeDetail;
