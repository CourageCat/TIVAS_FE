import classNames from "classnames/bind";
import styles from "./ChangePassword.module.scss";

import images from "~/assets/images";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function ChangePassword() {
    return (
        <div className={cx("wrapper")}>
            <h2 className={cx("heading")}>Change Password</h2>
            <div className={cx("change-password")}>
                <div className={cx("form")}>
                    <section className={cx("information")}>
                        {/* Login google */}
                        <section className={cx("login-google")}>
                            {/* Current Password*/}
                            <div className={cx("input_compo")}>
                                <label
                                    htmlFor="current-password"
                                    className={cx("label")}
                                >
                                    Current Password
                                </label>
                                <input
                                    type="text"
                                    id="current-password"
                                    className={cx("input")}
                                    placeholder="Current Password"
                                    // value={username}
                                    // onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            {/* Full Name */}
                            <div className={cx("input_compo")}>
                                <label
                                    htmlFor="new-password"
                                    className={cx("label")}
                                >
                                    New Password
                                </label>
                                <input
                                    type="text"
                                    id="new-password"
                                    className={cx("input")}
                                    placeholder="New Password"
                                    // value={fullName}
                                    // onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            {/* Phone Number */}
                            <div className={cx("input_compo")}>
                                <label
                                    htmlFor="retype-password"
                                    className={cx("label")}
                                >
                                    Re-Type Password
                                </label>
                                <input
                                    type="text"
                                    id="retype-password"
                                    className={cx("input")}
                                    placeholder="Re-Type Password"
                                    // value={numberPhone}
                                    // onChange={(e) => setNumberPhone(e.target.value)}
                                />
                            </div>
                            <button type="submit" className={cx("action-save")}>
                                Update
                            </button>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
