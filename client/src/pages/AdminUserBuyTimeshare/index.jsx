import classNames from "classnames/bind";
import styles from "./AdminUserBuyTimeshare.module.scss";
import { useEffect, useState } from "react";
import {
  getUserNoPriority,
  getUserPriority,
} from "~/controllers/reservationTicket";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
const cx = classNames.bind(styles);

function AdminUserBuyTimeshare() {
  const [listUser, setListUser] = useState([]);
  const [listUserNo, setListUserNo] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserPriority(axiosInstance, id);
      if (res?.err === 0) {
        setListUser(res?.data);
      } else {
          setListUser([]);
      }

      const resOne = await getUserNoPriority(axiosInstance, id);
      if (resOne?.err === 0) {
        setListUserNo(resOne?.data);
      } else {
        setListUserNo([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div>
        <h1>User pass</h1>
        <table className={cx("table")}>
          <thead className={cx("thead")}>
            <tr>
              <th className={cx("project", "column")}>
                <h4 className={cx("title")}>Username</h4>
              </th>
              <th className={cx("unit", "column")}>
                <h4 className={cx("title")}>FullName</h4>
              </th>
            </tr>
          </thead>
          <tbody className={cx("tbody")}>
            {listUser?.map((item, index) => {
              return (
                <tr key={index} className={cx("trow")}>
                  <td className={cx("project", "column")}>{item?.username}</td>
                  <td className={cx("unit", "column")}>
                    <span className={cx("name", "text")}>{item?.fullName}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* <tfoot className={cx("tfoot")}>
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
            </tfoot> */}
        </table>
      </div>

      <div>
        <h1>User not pass</h1>
        <table className={cx("table")}>
          <thead className={cx("thead")}>
            <tr>
              <th className={cx("project", "column")}>
                <h4 className={cx("title")}>Username</h4>
              </th>
              <th className={cx("unit", "column")}>
                <h4 className={cx("title")}>FullName</h4>
              </th>
            </tr>
          </thead>
          <tbody className={cx("tbody")}>
            {listUserNo?.map((item, index) => {
              return (
                <tr key={index} className={cx("trow")}>
                  <td className={cx("project", "column")}>{item?.username}</td>
                  <td className={cx("unit", "column")}>
                    <span className={cx("name", "text")}>{item?.fullName}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* <tfoot className={cx("tfoot")}>
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
            </tfoot> */}
        </table>
      </div>
    </div>
  );
}

export default AdminUserBuyTimeshare;
