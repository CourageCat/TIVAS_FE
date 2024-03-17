import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import Navigations from "~/components/Layouts/Navigations";
import Footer from "~/components/Layouts/Footer";
import Sidebar from "~/components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function ProfileLayout({ children }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  useEffect(() => {
    if(!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className={cx("profile-wrapper")}>
      {/* Header */}
      <header className={cx("header")}>
        <div className={cx("navigation")}>
          <Navigations />
        </div>
      </header>
      {/* Main */}
      <main className={cx("main")}>
        <section className={cx("sidebar")}>
          <Sidebar />
        </section>
        <section className={cx("main-view")}>{children}</section>
      </main>
      {/* Footer */}
      <footer className={cx("footer")}>
        <Footer />
      </footer>
    </div>
  );
}

export default ProfileLayout;
