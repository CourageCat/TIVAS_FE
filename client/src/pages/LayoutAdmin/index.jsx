import classNames from "classnames/bind";
import styles from "./LayoutAdmin.module.scss";

import images from "~/assets/images";
import AdminSidebar from "~/components/Layouts/AdminSidebar";
import AdminHeader from "~/components/Layouts/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function LayoutAdmin({ children }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  useEffect(() => {
    if (!currentUser || currentUser?.data?.roleID === 3) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className={cx("admin-wrapper")}>
      {/* Sidebar */}
      <section className={cx("sidebar")}>
        <AdminSidebar />
      </section>

      {/* Main */}
      <section className={cx("main")}>
        {/* Header */}
        <header className={cx("header")}>
          <AdminHeader />
        </header>
        <div className={cx("children")}>{children}</div>
      </section>
    </div>
  );
}

export default LayoutAdmin;
