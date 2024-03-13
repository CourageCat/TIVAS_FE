import classNames from "classnames/bind";
import styles from "./AdminManageTimeshare.module.scss";
import { useRef, useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { Toaster, toast } from "sonner";
import ToastNotify from "~/components/ToastNotify";
import { getAllTypeRoomAdmin } from "~/controllers/typeRoom";
import ActionTypeRoom from "~/components/ActionTypeRoom";
const cx = classNames.bind(styles);

const limit = 5;

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

function AdminManageTimeshare() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const [listTypeRooms, setListTypeRooms] = useState([]);

  const [countPage, setCountPage] = useState(1);
  const [notify, setNotify] = useState({});

  const [page, setPage] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getAllTypeRoomAdmin(axiosInstance, id, {
        page: page,
        limit: limit,
      });
      console.log(res);
      if (res) {
        setListTypeRooms(res.data);
        setCountPage(res.countPages);
      } else {
        setListTypeRooms([]);
        setCountPage(1);
      }
    };
    fetchUser();
  }, [page]);

  useEffect(() => {
    if (notify?.err === 1) {
      toast.custom(() => (
        <ToastNotify type="error" title="Error" desc={notify?.mess} />
      ));
      setNotify({});
    } else if (notify?.err === 0) {
      toast.custom(() => (
        <ToastNotify type="success" title="Success" desc={notify?.mess} />
      ));
      setNotify({});
    }
  }, [notify]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleNavigate = (id) => {
    navigate(`/timesharedetail/${id}`);
  };

  return (
    <div className={cx("wrapper")}>
      <Toaster position="top-right" richColors expand={true} />

      <h1 className={cx("title")}> Manage timeshare</h1>
      <div className={cx("content")}>
        <div className={cx("list-projects")}>
          <table className={cx("table")}>
            <thead className={cx("thead")}>
              <tr>
                <th className={cx("id", "column")}>
                  <h4 className={cx("title")}>ID</h4>
                </th>
                <th className={cx("project", "column")}>
                  <h4 className={cx("title")}>Thumbnail</h4>
                </th>
                <th className={cx("unit", "column")}>
                  <h4 className={cx("title")}>Type room</h4>
                </th>
                <th className={cx("action", "column")}>
                  <h4 className={cx("title")}>Action</h4>
                </th>
              </tr>
            </thead>
            <tbody className={cx("tbody")}>
              {listTypeRooms?.map((item, index) => {
                return (
                  <tr key={index} className={cx("trow")}>
                    <td className={cx("id", "column")}>
                      <span className={cx("name", "text")}>{index + 1}</span>
                    </td>
                    <td className={cx("project", "column")}>
                      <figure className={cx("infor")}>
                        <img
                          src={item?.Images[0]?.pathUrl}
                          alt="image_one"
                          className={cx("image")}
                        />
                      </figure>
                    </td>
                    <td className={cx("unit", "column")}>
                      <span className={cx("name", "text")}>
                        <div className={cx("name-project", "text")}>
                          {item?.name}
                        </div>
                      </span>
                    </td>

                    <td className={cx("action", "column")}>
                      <ActionTypeRoom
                        id={item?.id}
                        username={item?.username}
                        banStatus={item?.banStatus}
                        notify={notify}
                        setNotify={setNotify}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={cx("paginate")}>
          <Stack spacing={2}>
            <Pagination
              count={countPage}
              variant="outlined"
              color="primary"
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default AdminManageTimeshare;
