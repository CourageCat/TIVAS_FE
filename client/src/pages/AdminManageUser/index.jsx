import classNames from "classnames/bind";
import styles from "./AdminManageUser.module.scss";
import { useRef, useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import images from "~/assets/images";
import ActionUser from "~/components/ActionUser";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { getAllUsers } from "~/controllers/user";
import { Toaster, toast } from "sonner";
import ToastNotify from "~/components/ToastNotify";
import { Box, CircularProgress } from "@mui/material";
const cx = classNames.bind(styles);

const limit = 5;

function AdminManageUser() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const [listUsers, setListUsers] = useState([]);
  const [countPage, setCountPage] = useState(1);
  const [notify, setNotify] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getAllUsers(axiosInstance, {
        page: page,
        limit: limit,
      });
      setListUsers(res.data);
      setCountPage(res.countPages);
      setIsLoading(false);
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

  return (
    <div className={cx("wrapper")}>
      <Toaster position="top-right" richColors expand={true} />

      <h1 className={cx("title")}> Manage User</h1>
      {isLoading === false && listUsers && (
        <div className={cx("content")}>
          <div className={cx("list-user")}>
            <table className={cx("table")}>
              <thead className={cx("thead")}>
                <tr>
                  <th className={cx("avatar", "column")}>
                    <h4 className={cx("title")}>Avatar</h4>
                  </th>
                  <th className={cx("username", "column")}>
                    <h4 className={cx("title")}>Username</h4>
                  </th>
                  <th className={cx("fullName", "column")}>
                    <h4 className={cx("title")}>Full Name</h4>
                  </th>
                  <th className={cx("email", "column")}>
                    <h4 className={cx("title")}>Email</h4>
                  </th>
                  <th className={cx("phoneNumber", "column")}>
                    <h4 className={cx("title")}>Phone number</h4>
                  </th>
                  <th className={cx("typeLogin", "column")}>
                    <h4 className={cx("title")}>Type login</h4>
                  </th>
                  <th className={cx("status", "column")}>
                    <h4 className={cx("title")}>Status</h4>
                  </th>
                  <th className={cx("action", "column")}>
                    <h4 className={cx("title")}>Action</h4>
                  </th>
                </tr>
              </thead>
              <tbody className={cx("tbody")}>
                {listUsers.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className={cx("trow")}
                      // onClick={() => handleNavigate(item.id)}
                    >
                      <td className={cx("avatar", "column")}>
                        <figure className={cx("infor")}>
                          <img
                            src={images.unknown}
                            alt="image_one"
                            className={cx("image")}
                          />
                        </figure>
                      </td>
                      <td className={cx("username", "column")}>
                        <span className={cx("name", "text")}>
                          {item?.username}
                        </span>
                      </td>
                      <td className={cx("fullName", "column")}>
                        <span className={cx("name")}>{item?.fullName}</span>
                      </td>
                      <td className={cx("email", "column")}>
                        <span className={cx("name")}>{item?.email}</span>
                      </td>
                      <td className={cx("phoneNumber", "column")}>
                        <span className={cx("name")}>{item?.phoneNumber}</span>
                      </td>
                      <td className={cx("typeLogin", "column")}>
                        <span className={cx("name")}>{item?.type}</span>
                      </td>
                      <td className={cx("status", "column")}>
                        <div
                          className={cx("btn", {
                            ban: item?.banStatus === 1,
                          })}
                        >
                          <span className={cx("name")}>
                            {item?.banStatus === 0 ? "Unban" : "Ban"}
                          </span>
                          {item?.banStatus === 1 && (
                            <span className={cx("reason")}>
                              {item?.reasonBan}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={cx("action", "column")}>
                        <ActionUser
                          User
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
      )}
      {isLoading === false && !listUsers && <h4>Empty user</h4>}
      {isLoading === true && (
        <Box
          sx={{
            marginTop: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default AdminManageUser;
