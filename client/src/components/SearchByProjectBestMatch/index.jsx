import classNames from "classnames/bind";
import styles from "./SearchByProjectName.module.scss";

import images from "~/assets/images";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Rating, Stack, Pagination } from "@mui/material";

import { searchProjects } from "~/controllers/project";

const cx = classNames.bind(styles);

const limit = 5;

function formatDate(dateString) {
  var date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function SearchByProjectBestMatch(props) {
  const [projectData, setProjectData] = useState(null);
  const [countPage, setCountPage] = useState(1);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { type } = useParams();

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // var formattedStartDate = formatDate(openDate);
  // var formattedEndDate = formatDate(closeDate);
  // var formattedReservation = formatDate(reservationDate);

  useEffect(() => {
    const fetchListing = async () => {
      const res = await searchProjects(axiosInstance, {
        page: page,
        info: props?.searchValue.split("=")[1],
        searchBy: "name,location",
        limit,
      });
      setProjectData(res?.data);
      setCountPage(res?.countPages);
    };
    fetchListing();
  }, [props?.searchValue, page]);

  return (
    <div className={cx("wrapper")}>
      {projectData ? (
        <div className={cx("project-wrapper")}>
          <div>
            {projectData.map((item, index) => {
              return (
                <Link to={`/projectdetail/${item.id}`}>
                  <div className={cx("project-result")}>
                    <div className={cx("content")}>
                      {/* Left Content */}
                      <div className={cx("left-content")}>
                        {/* Thumb Project */}

                        <img
                          className={cx("thumb-project")}
                          src={item?.thumbnailPathUrl}
                          alt="Thumb Project "
                        />
                      </div>

                      {/* Right Content */}
                      <div className={cx("right-content")}>
                        <h1 className={cx("project-name")}>{item?.name}</h1>

                        {/* Locate Row */}
                        <div className={cx("row-locate")}>
                          <img
                            className={cx("locate-icon")}
                            src={images.locateIcon}
                            alt="Locate Icon"
                          />
                          <p className={cx("desc")}>{item?.location}</p>
                        </div>
                        {/* Utilities Row */}
                        <div className={cx("row-utilities")}>
                          <div className={cx("row")}>
                            {item?.attractions?.slice(0, 3).map((item) => (
                              <div className={cx("desc")}>{item}</div>
                            ))}
                          </div>
                        </div>
                        {item?.openDate ? (
                          <div className={cx("group-row")}>
                            {/* Open & Close Date */}
                            <div className={cx("group-date")}>
                              {/* Open Date */}
                              <div className={cx("date", "text")}>
                                OpenDate:{" "}
                                <span className={cx("text")}>
                                  {formatDate(item?.openDate)}
                                </span>
                              </div>
                              {/* Close Date */}
                              <div className={cx("date", "text")}>
                                CloseDate:{" "}
                                <span className={cx("text")}>
                                  {formatDate(item?.closeDate)}
                                </span>
                              </div>
                            </div>
                            {/* Reservation Group */}
                            <div className={cx("reservation-group")}>
                              <div className={cx("reservation", "text")}>
                                Reservation Price:{" "}
                                <span className={cx("text")}>
                                  {" "}
                                  {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  }).format(item?.reservationPrice)}
                                </span>
                              </div>

                              <div className={cx("reservation", "text")}>
                                Reservation Day:{" "}
                                <span className={cx("text")}>
                                  {formatDate(item?.reservationDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className={cx("up-coming")}>Up Coming !</div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={cx("empty-wrapper")}>
          <img src={images.empty} alt="empty" className={cx("empty-img")} />
        </div>
      )}

      {projectData && (
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

export default SearchByProjectBestMatch;
