import classNames from "classnames/bind";
import styles from "./ListingDetails.module.scss";
import React, { useEffect, useState } from "react";
import Navigations from "~/components/Layouts/Navigations";
import Footer from "~/components/Layouts/Footer";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import SearchPage from "~/components/SearchPage";
import Slider from "react-slick";
import Search from "~/components/Search";
import { Rating, Stack, Pagination } from "@mui/material";
import { getAllTimeshare } from "~/controllers/timeshare";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";

const cx = classNames.bind(styles);

const FEATURED_RESORT = [
  {
    link: "#!",
    image: images.resort,
    name: "Margaritaville Vacation Club by Wyndham - Rio Mar",
    time: "May 4 - May 11, 2024",
    available: "Hilton Vacation Club Kaanapali Beach",
    price: " $285/night",
  },
  {
    link: "#!",
    image: images.resort,
    name: "Margaritaville Vacation Club by Wyndham - Rio Mar",
    time: "May 4 - May 11, 2024",
    available: "Hilton Vacation Club Kaanapali Beach",
    price: " $285/night",
  },
  {
    link: "#!",
    image: images.resort,
    name: "Margaritaville Vacation Club by Wyndham - Rio Mar",
    time: "May 4 - May 11, 2024",
    available: "Hilton Vacation Club Kaanapali Beach",
    price: " $285/night",
  },
  {
    link: "#!",
    image: images.resort,
    name: "Margaritaville Vacation Club by Wyndham - Rio Mar",
    time: "May 4 - May 11, 2024",
    available: "Hilton Vacation Club Kaanapali Beach",
    price: " $285/night",
  },
  {
    link: "#!",
    image: images.resort,
    name: "Margaritaville Vacation Club by Wyndham - Rio Mar",
    time: "May 4 - May 11, 2024",
    available: "Hilton Vacation Club Kaanapali Beach",
    price: " $285/night",
  },
  {
    link: "#!",
    image: images.resort,
    name: "Margaritaville Vacation Club by Wyndham - Rio Mar",
    time: "May 4 - May 11, 2024",
    available: "Hilton Vacation Club Kaanapali Beach",
    price: " $285/night",
  },
];

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

const settings = {
  infinite: true,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

function ListingDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const [input, setInput] = useState("");
  const [featuredResort, setFeaturedResort] = useState(FEATURED_RESORT);
  const [listingResort, setListingResort] = useState(null);
  const [countPage, setCountPage] = useState(1);
  const [page, setPage] = useState(1);

  const featuredListing = () => {
    return featuredResort?.map((item, index) => {
      return (
        <div key={index}>
          <div className={cx("featured-box")}>
            <Link to="#!">
              <img src={item.image} alt={item.name} className={cx("f-image")} />
              <div className={cx("heart-bandle")}></div>

              <section className={cx("f-content")}>
                <h4>{item.available}</h4>
                <h3 className={cx("f-name")}>{item.name}</h3>
                <div className={cx("f-row")}></div>
                <span className={cx("f-available")}></span>
                <span className={cx("date")}>{item.time}</span>
                <div className={cx("f-row", "f-price")}>
                  <p className={cx("f-text")}>{item.price}</p>
                </div>
              </section>
            </Link>
          </div>
        </div>
      );
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      const res = await getAllTimeshare(axiosInstance, { page: page });
      setListingResort(res.data);
      console.log(res.data);
      setCountPage(res.countPages);
    };
    fetchListing();
  }, [page]);

  const handleNavigate = (id) => {
    navigate(`/timesharedetail/${id}`);
  };

  return (
    <div className={cx("destination-wrapper")}>
      {/* Header */}
      <header className={cx("header")}>
        <div className={cx("navigation")}>
          <Navigations />
        </div>
      </header>
      {/* Breadcrumbs */}
      <section className={cx("breadcrumbs")}>
        <h1 className={cx("title")}>Listings</h1>
        <div className={cx("list-nav")}>
          <Link to="/" className={cx("nav")}>
            Home
          </Link>
          <span className={cx("nav")}> - </span>
          <span className={cx("nav", "text")}>Listings</span>
        </div>
      </section>
      {/* Main */}
      <main className={cx("main")}>
        {/* Content */}
       {listingResort && <section className={cx("body")}>
          <div className={cx("top-resort")}>
            {/* List box */}
            <div className={cx("top-resort-header")}>
              <h2 className={cx("title")}>Featured Listing</h2>
            </div>
            {/*Featured Listing */}
            <div className={cx("featured-listing")}>
              <Slider {...settings}>{featuredListing()}</Slider>
            </div>
            {/*Listing Details */}
            <div className={cx("list-listing")}>
              <table className={cx("table")}>
                <thead className={cx("thead")}>
                  <tr>
                    <th className={cx("project", "column")}>
                      <h4 className={cx("title")}>Project</h4>
                    </th>
                    <th className={cx("unit", "column")}>
                      <h4 className={cx("title")}>Unit</h4>
                    </th>
                    <th className={cx("sleep", "column")}>
                      <h4 className={cx("title")}>Sleeps</h4>
                    </th>
                    <th className={cx("date", "column")}>
                      <h4 className={cx("title")}>Dates</h4>
                    </th>
                    <th className={cx("price", "column")}>
                      <h4 className={cx("title")}>Price</h4>
                    </th>
                  </tr>
                </thead>
                <tbody className={cx("tbody")}>
                  {listingResort.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className={cx("trow")}
                        onClick={() => handleNavigate(item.id)}
                      >
                        <td className={cx("project", "column")}>
                          <figure className={cx("infor")}>
                            <img
                              src={
                                item?.TypeRoom?.TypeOfProject?.Project
                                  ?.thumbnailPathUrl
                              }
                              alt="image_one"
                              className={cx("image")}
                            />
                            <section className={cx("box")}>
                              <h3 className={cx("name-project", "text")}>
                                {item?.TypeRoom?.TypeOfProject?.Project?.name}
                              </h3>
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
                                <span className={cx("position", "text")}>
                                  {item?.location}
                                </span>
                              </div>
                            </section>
                          </figure>
                        </td>
                        <td className={cx("unit", "column")}>
                          <span className={cx("name", "text")}>
                            {item?.TypeRoom?.name}
                          </span>
                        </td>
                        <td className={cx("sleep", "column")}>
                          <span className={cx("name")}>
                            {item?.TypeRoom?.persons}
                          </span>
                        </td>
                        <td className={cx("date", "column")}>
                          <span className={cx("name")}>
                            {`${convertToDate(
                              item?.startDate
                            )} - ${convertToDate(item?.endDate)}`}
                          </span>
                        </td>
                        <td className={cx("price", "column")}>
                          <span className={cx("name")}>
                            {`${Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }).format(item?.price)}`}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
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
              </table>
            </div>
          </div>
        </section>}
      </main>
      <Footer />
    </div>
  );
}

export default ListingDetails;
