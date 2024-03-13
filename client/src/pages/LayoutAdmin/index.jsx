import classNames from "classnames/bind";
import styles from "./LayoutAdmin.module.scss";

import images from "~/assets/images";
import AdminSidebar from "~/components/Layouts/AdminSidebar";
import AdminHeader from "~/components/Layouts/AdminHeader";

const cx = classNames.bind(styles);

function LayoutAdmin({children}) {
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
