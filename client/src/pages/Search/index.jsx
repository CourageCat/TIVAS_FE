import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Navigations from "~/components/Layouts/Navigations";
import ExpandList from "~/components/ExpandList";

import { Link, useParams, useNavigate } from "react-router-dom";
import { getAllLocations } from "~/controllers/location";

import SearchByProjectName from "~/components/SearchByProjectName";
import SearchByProjectLocation from "~/components/SearchByProjectLocation";
import SearchByProjectBestMatch from "~/components/SearchByProjectBestMatch";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { stepButtonClasses } from "@mui/material";

import images from "~/assets/images";

import Footer from "~/components/Layouts/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";

const cx = classNames.bind(styles);

const limit = 5;

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
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

function Search() {
    // const [projectData, setProjectData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [value, setValue] = useState(0);
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (event, newValue) => {
        if (newValue === 0) {
            navigate(`/search/type=project&${searchValue}`);
        }
        if (newValue === 1) {
            navigate(`/search/type=location&${searchValue}`);
        }
        if (newValue === 2) {
            navigate(`/search/type=bestmatch&${searchValue}`);
        }

        setValue(newValue);
    };

    const { type } = useParams();

    useEffect(() => {
        const typeSearch = type.split("&")[0];
        const valueSearch = type.split("&")[1];

        if (typeSearch === "type=project") setValue(0);
        if (typeSearch === "type=location") setValue(1);
        if (typeSearch === "type=bestmatch") setValue(2);

        setSearchValue(valueSearch);
    }, [type]);

    useEffect(() => {
        const fetchData = async () => {
            const resLocation = await getAllLocations(axiosInstance);

            if (resLocation?.err === 0) {
                setLocationData(resLocation?.data);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={cx("page-search-wrapper")}>
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
                    {/*Content*/}
                    <div className={cx("content")}>
                        {/* Left content */}
                        <div className={cx("left-content")}>
                            {/* Project Result */}
                            <Box sx={{ width: "100%" }}>
                                <Box
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: "divider",
                                    }}
                                >
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="basic tabs example"
                                    >
                                        <Tab
                                            label="Project"
                                            {...a11yProps(0)}
                                            className={cx("test")}
                                            sx={{
                                                fontSize: "1.2rem",
                                                fontFamily:
                                                    "Poppins, sans-serif",
                                                minWidth: "150px",
                                                fontWeight: "600",
                                            }}
                                        />
                                        <Tab
                                            label="Location"
                                            {...a11yProps(1)}
                                            className={cx("test")}
                                            sx={{
                                                fontSize: "1.2rem",
                                                fontFamily:
                                                    "Poppins, sans-serif",
                                                minWidth: "199px",
                                                fontWeight: "600",
                                            }}
                                        />
                                        <Tab
                                            label="Best Match"
                                            {...a11yProps(2)}
                                            className={cx("test")}
                                            sx={{
                                                fontSize: "1.2rem",
                                                fontFamily:
                                                    "Poppins, sans-serif",
                                                minWidth: "199px",
                                                fontWeight: "600",
                                            }}
                                        />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <SearchByProjectName
                                        searchValue={searchValue}
                                    />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <SearchByProjectLocation
                                        searchValue={searchValue}
                                    />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    <SearchByProjectBestMatch
                                        searchValue={searchValue}
                                    />
                                </CustomTabPanel>
                            </Box>
                            {/* <Box sx={{ width: "100%" }}>
                                <Box
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: "divider",
                                    }}
                                >
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="basic tabs example"
                                    >
                                        <Tab
                                            label="All"
                                            {...a11yProps(0)}
                                            className={cx("test")}
                                            sx={{
                                                fontSize: "1.2rem",
                                                fontFamily:
                                                    "Poppin, sans-serif",
                                                minWidth: "150px",
                                                fontWeight: "600",
                                            }}
                                        />
                                        <Tab
                                            label="Reservation Project"
                                            {...a11yProps(1)}
                                            className={cx("test")}
                                            sx={{
                                                fontSize: "1.2rem",
                                                fontFamily:
                                                    "Poppin, sans-serif",
                                                minWidth: "199px",
                                                fontWeight: "600",
                                            }}
                                        />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    1
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    2
                                </CustomTabPanel>
                            </Box> */}
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
