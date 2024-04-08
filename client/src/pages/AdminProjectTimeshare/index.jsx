import classNames from "classnames/bind";
import styles from "./AdminProjectReservation.module.scss";
import ListProject from "~/components/ListProject";
import { useEffect, useState } from "react";
import { Rating, Stack, Pagination } from "@mui/material";
import { getProjectBooking, getProjectReservation, getProjectTimeshare } from "~/controllers/project";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import createAxios from "~/configs/axios";
import ListProjectNo from "~/components/ListProjectNo";

const cx = classNames.bind(styles);

function AdminProjectTimeshare() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const [countPage, setCountPage] = useState(1);
  const [page, setPage] = useState(1);

  const [listReservaion, setListReservaion] = useState([]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      const res = await getProjectTimeshare(axiosInstance, { page: page });
      setListReservaion(res.data);
      setCountPage(res.countPages);
      console.log(res);
    };
    fetchListing();
  }, [page]);

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Project purchased</h1>
      <div className={cx("content")}>
        <div className={cx("list-project")}>
          <div className={cx("header-list")}>
            <div className={cx("header")}>Thumnail</div>
            <div className={cx("header")}>Project Name</div>
            <div className={cx("header")}>Location Name</div>
            <div className={cx("header")}>Open Date</div>
            <div className={cx("header")}>Close Date</div>
          </div>

          {listReservaion.map((item, index) => {
            return (
              <ListProjectNo
                key={index}
                id={item?.id}
                image={item?.thumbnailPathUrl}
                name={item?.name}
                location={item?.location}
                openDate={item?.openDate}
                closeDate={item?.closeDate}
              />
            );
          })}
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
      </div>
    </div>
  );
}

export default AdminProjectTimeshare;
