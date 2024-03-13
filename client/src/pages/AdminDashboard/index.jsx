import classNames from "classnames/bind";
import styles from "./AdminDashboard.module.scss";

const cx = classNames.bind(styles);

function AdminDashboard() {
  return <div className={cx("wrapper")}>Admin dashboard</div>;
}

export default AdminDashboard;
