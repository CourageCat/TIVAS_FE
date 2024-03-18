import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Navigations from "~/components/Layouts/Navigations";

import { Link } from "react-router-dom";

import Footer from "~/components/Layouts/Footer";
import images from "~/assets/images";
import { useEffect, useRef, useState } from "react";

import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getTop10 } from "~/controllers/project";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { getAllLocations } from "~/controllers/location";

const cx = classNames.bind(styles);

const BLOG = [
    {
        title: "Tourist destinations worth staying in 2024",
        image: images.blogResort,
        desc: "In 2024, there are many beautiful tourist destinations that are worth staying at even once",
        date: "June 16, 2024",
        view: 120,
    },
    {
        title: "Tourist destinations worth staying in 2024",
        image: images.blogResort,
        desc: "In 2024, there are many beautiful tourist destinations that are worth staying at even once",
        date: "June 16, 2024",
        view: 120,
    },
    {
        title: "Tourist destinations worth staying in 2024",
        image: images.blogResort,
        desc: "In 2024, there are many beautiful tourist destinations that are worth staying at even once",
        date: "June 16, 2024",
        view: 120,
    },
];

const FEED_BACK = [
    {
        image: images.portrait,
        desc: "I feel this application is great, it has helped me have a satisfactory house for my family this Tet holiday.",
        fullName: "Nguyen Mai Viet Vy",
    },
    {
        image: images.portrait,
        desc: "I feel this application is great, it has helped me have a satisfactory house for my family this Tet holiday.",
        fullName: "Nguyen Van Teo",
    },
    {
        image: images.portrait,
        desc: "I feel this application is great, it has helped me have a satisfactory house for my family this Tet holiday.",
        fullName: "Bentanick",
    },
    {
        image: images.portrait,
        desc: "I feel this application is great, it has helped me have a satisfactory house for my family this Tet holiday.",
        fullName: "Kolorado",
    },
    {
        image: images.portrait,
        desc: "I feel this application is great, it has helped me have a satisfactory house for my family this Tet holiday.",
        fullName: "Ro nan do",
    },
];

const settingsFeedback = {
    infinite: true,
    touchMove: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: "linear",
    prevArrow: <CustomPrevArrowFeedback />,
    nextArrow: <CustomNextArrowFeedback />,
};

function CustomNextArrowFeedback(props) {
    const { onClick } = props;
    return (
        <div className={cx("feedback-btn", "feedback-next")} onClick={onClick}>
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
        </div>
    );
}

function CustomPrevArrowFeedback(props) {
    const { onClick } = props;
    return (
        <div className={cx("feedback-btn", "feedback-prev")} onClick={onClick}>
            <svg
                className={cx("icon")}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
            </svg>
        </div>
    );
}

function CustomNextArrowTopResort(props) {
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

function CustomPrevArrowTopResort(props) {
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

const settingTopResort = {
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrowTopResort />,
    nextArrow: <CustomNextArrowTopResort />,
};

function Home() {
    const [listBlog, setListBlog] = useState(BLOG);
    const [listFeedback, setListFeedback] = useState(FEED_BACK);
    const [listTimeshareSale, setListTimeshareSale] = useState(FEED_BACK);
    const [topResort, setTopResort] = useState([]);
    const [listLocation, setListLocation] = useState([]);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const renderBlog = () => {
        return listBlog.map((item, index) => {
            return (
                <div key={index} className={cx("blog")}>
                    <LazyLoadImage
                        src={item.image}
                        alt="blog"
                        className={cx("image")}
                    />
                    <div className={cx("content")}>
                        <h4 className={cx("title")}>{item.title}</h4>
                        <p className={cx("desc")}>{item.desc}</p>
                        <div className={cx("footer-blog")}>
                            <div className={cx("element")}>
                                <svg
                                    className={cx("icon")}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                </svg>
                                <span className={cx("text")}>{item.date}</span>
                            </div>
                            <div className={cx("element")}>
                                <svg
                                    className={cx("icon")}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                </svg>
                                <span className={cx("text")}>
                                    {item.view} views
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const renderFeedback = () => {
        return listFeedback.map((item, index) => {
            return (
                <div key={index}>
                    <div className={cx("feedback")}>
                        <LazyLoadImage
                            src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg"
                            alt={item.name}
                            className={cx("image")}
                        />
                        <div className={cx("content")}>
                            <h3 className={cx("heading")}>
                                What our guests say
                            </h3>
                            <div className={cx("review")}>
                                <div className={cx("rating")}>
                                    <div className={cx("list-icon")}>
                                        <svg
                                            className={cx("icon")}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                        <svg
                                            className={cx("icon")}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                        <svg
                                            className={cx("icon")}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                        <svg
                                            className={cx("icon")}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                        <svg
                                            className={cx("icon")}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                    </div>
                                    <p className={cx("text")}>{item.desc}</p>
                                    <span className={cx("full-name")}>
                                        {item.fullName}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const renderTopResort = () => {
        return topResort.map((item, index) => {
            return (
                <div key={index}>
                    <div className={cx("box")}>
                        <Link to={`/projectdetail/${item.id}`}>
                            <img
                                src={item.thumbnailPathUrl}
                                alt={item.name}
                                className={cx("image")}
                            />
                            <div className={cx("heart-bandle")}>
                                <span className={cx("bandle")}>
                                    Top 10 Resort
                                </span>
                            </div>
                            <section className={cx("content")}>
                                <h3 className={cx("name")}>{item.name}</h3>
                                <span className={cx("location")}>
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

                                    <span className={cx("text")}>
                                        {item.location}
                                    </span>
                                </span>
                            </section>
                        </Link>
                    </div>
                </div>
            );
        });
    };

    useEffect(() => {
        const topResort = async () => {
            const res = await getTop10(axiosInstance);
            if (res.err === 0) {
                setTopResort(res.data);
            }
            const resLocation = await getAllLocations(axiosInstance);
            if (resLocation.err === 0) {
                setListLocation(resLocation.data);
            }
        };
        topResort();
    }, []);

    return (
        <div className={cx("home-wrapper")}>
            {/* Header */}
            <header className={cx("header")}>
                {/* Navigations */}
                <section className={cx("navigation")}>
                    <Navigations />
                </section>
                {/* Hero */}
                <div className={cx("hero-wrapper")}>
                    <img
                        src={images.heroImg}
                        alt="Hero_Image"
                        className={cx("hero-img")}
                    />
                    <h1 className={cx("hero-title")}>
                        Welcome to <span>Tivas</span>
                    </h1>
                </div>
            </header>
            {/* Main */}
            <main className={cx("content")}>
                <section className={cx("top-resort")}>
                    <h2 className={cx("title")}>Top Resorts</h2>
                    <div className={cx("list-box")}>
                        <Slider {...settingTopResort}>
                            {renderTopResort()}
                        </Slider>
                    </div>
                </section>
                <section className={cx("destinations")}>
                    <h2 className={cx("title")}>Trending destinations</h2>
                    <div className={cx("wrapper")}>
                        <div className={cx("list-one")}>
                            {listLocation.slice(0, 2).map((item, index) => (
                                <Link
                                    to={`/search/type=location&value=${item?.name}`}
                                    key={index}
                                >
                                    <div className={cx("box")}>
                                        <img
                                            src={item?.imagePathUrl}
                                            alt="image_one"
                                            className={cx("image")}
                                        />
                                        <span className={cx("text")}>
                                            {item?.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className={cx("list-two")}>
                            {listLocation.slice(2, 5).map((item, index) => (
                                <Link
                                    to={`/search/type=location&value=${item?.name}`}
                                    key={index}
                                >
                                    <div className={cx("box")}>
                                        <img
                                            src={item?.imagePathUrl}
                                            alt="image_one"
                                            className={cx("image")}
                                        />
                                        <span className={cx("text")}>
                                            {item?.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Explore */}
                <section className={cx("explore-wrapper")}>
                    <div className={cx("explore-content")}>
                        {/* Thumb Image */}
                        <img
                            src={images.thumbImg}
                            alt="Thumb_Image"
                            className={cx("thumb-img")}
                        />
                        {/*Rigth content*/}
                        <div className={cx("right-content")}>
                            <h3 className={cx("right-header")}>
                                Explore your home Time for payment
                            </h3>
                            <p className={cx("desc")}>
                                We support flexible payments in stages to help
                                you manage your finances conveniently, while
                                ensuring your real estate purchase progress goes
                                smoothly.
                            </p>

                            {/* <a href="!#"> */}
                            <Link to="#!" className={cx("explore-link")}>
                                Search Property
                            </Link>
                        </div>
                    </div>
                </section>
                {/* Feedback */}
                <section className={cx("feedback-wrapper")}>
                    <Slider {...settingsFeedback}>{renderFeedback()}</Slider>
                    {/* <div className={cx("button")}></div> */}
                </section>
                {/* Blog */}
                <section className={cx("blog-wrapper")}>
                    <div className={cx("row")}>
                        <h3 className={cx("heading")}>Tivas news</h3>
                        <div className={cx("view-all")}>
                            <span className={cx("text")}>View all news</span>
                        </div>
                    </div>
                    <div className={cx("list-blog")}>{renderBlog()}</div>
                </section>
            </main>
            {/* Footer */}
            <footer className={cx("footer")}>
                <Footer />
            </footer>
        </div>
    );
}

export default Home;
