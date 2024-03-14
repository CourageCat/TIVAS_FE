import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Navigations from "~/components/Layouts/Navigations";
import ProjectResult from "~/components/ProjectResult";
import ExpandList from "~/components/ExpandList";
import SearchPage from "~/components/SearchPage";
import { Rating, Stack, Pagination } from "@mui/material";

import { Link, useParams } from "react-router-dom";
import { getAllProjects } from "~/controllers/project";
import { getAllLocations } from "~/controllers/location";

import images from "~/assets/images";

import Footer from "~/components/Layouts/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "~/services";

import createAxios from "~/configs/axios";
import { resetLogin } from "~/redux/authSlice";

const cx = classNames.bind(styles);

function Search({}) {
    const [login, setLogin] = useState(false);
    const [projectData, setProjectData] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [countPage, setCountPage] = useState(1);
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllProjects(axiosInstance, id);
            const resLocation = await getAllLocations(axiosInstance);

            if (res?.err === 0) {
                setProjectData(res.data);
                // console.log(locationData?.name);
            }
            if (resLocation?.err === 0) {
                setLocationData(resLocation.data);
            }
        };
        fetchData();
    }, []);

    const handleCloseLogin = () => {
        setLogin(false);
        dispatch(resetLogin());
    };

    const action = async () => {
        try {
            const res = await getAll(axiosInstance);
            console.log(res);
        } catch (err) {
            console.log("Error");
        }
    };
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div classNames={cx("page-search-wrapper")}>
            {/* Header */}
            <header className={cx("header")}>
                <div className={cx("navigation")}>
                    <Navigations />
                </div>
            </header>
            {/* Breadcrumbs */}
            <section className={cx("breadcrumbs")}>
                <h1 className={cx("title")}>Search</h1>
                <div className={cx("list-nav")}>
                    <Link to="/" className={cx("nav")}>
                        Home
                    </Link>
                    <span className={cx("nav")}> - </span>
                    <span className={cx("nav", "text")}>Listings</span>
                </div>
            </section>

            {/* Main */}
            <main className={cx("main-content")}>
                <div className={cx("container")}>
                    {/* Search Bar*/}
                    <div className={cx("search-wrapper")}>
                        <SearchPage />
                    </div>

                    {/*Content*/}
                    <div className={cx("content")}>
                        {/* Left content */}
                        <div className={cx("left-content")}>
                            {/* Bread Crumb */}
                            <div className={cx("bread-crumb")}>
                                <Link to="/home">
                                    <span className={cx("crumb-name")}>
                                        Home
                                    </span>
                                </Link>
                                <img
                                    className={cx("crumb-icon")}
                                    src={images.rightArrow}
                                    alt="Right Arrow"
                                />
                                <p className={cx("crumb-name")}>
                                    11 project found
                                </p>
                            </div>

                            {/*Row Descript*/}
                            <div className={cx("row")}>
                                {/* Desc */}
                                <p className={cx("desc")}>
                                    Villa, Hotel , Project Launches in Ho Chi
                                    Minh
                                </p>
                                {/* Form Control */}
                                <select
                                    className={cx("form-control")}
                                    name={cx("sort")}
                                    id={cx("sort-box")}
                                >
                                    {/* Relevance option */}
                                    <option
                                        value={cx("relevance")}
                                        selected={cx("selected")}
                                    >
                                        Relevance
                                    </option>
                                    {/* Newest First */}
                                    <option value={cx("newest")}>Newest</option>
                                </select>
                            </div>

                            {/* Project Result */}
                            {projectData.map((item, index) => {
                                return (
                                    <ProjectResult
                                        key={index}
                                        name={item?.name}
                                        image={item?.thumbnailPathUrl}
                                        location={item?.location}
                                        features={item?.features}
                                        openDate={item?.openDate}
                                        closeDate={item?.closeDate}
                                        reservationDate={item?.reservationDate}
                                        reservationPrice={item.reservationPrice}
                                    />
                                );
                            })}
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
                        {/* Right content */}
                        <div className={cx("right-content")}>
                            <div className={cx("sticky-content")}>
                                <>
                                    <ExpandList locationDetail={locationData} />
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* Footer */}
            <footer className={cx("footer")}>
                <Footer />
            </footer>
        </div>
    );
}

export default Search;
