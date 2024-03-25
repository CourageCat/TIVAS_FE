import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx("footer-wrapper")}>
            <div className={cx("container")}>
                <header className={cx("top")}>
                    {/* Left */}
                    <section className={cx("left")}>
                        <h1 className={cx("logo")}>TIVAS</h1>
                        <span className={cx("desc")}>
                            We will help you have a dream vacation. This is our
                            wish, for any detailed information you are
                            interested in, please contact us
                        </span>
                        <div className={cx("social-contact")}>
                            <img
                                src={images.twitterFooter}
                                alt="Twitter"
                                className={cx("icon")}
                            />
                            <img
                                src={images.facebookFooter}
                                alt="Facebook"
                                className={cx("icon")}
                            />
                            <img
                                src={images.linkedInFooter}
                                alt="LinkedIn"
                                className={cx("icon")}
                            />
                        </div>
                    </section>
                    {/* Right */}
                    <section className={cx("right")}>
                        <div className={cx("row")}>
                            {/* Column */}
                            <section className={cx("column")}>
                                <h2 className={cx("title")}>Company</h2>
                                <div className={cx("border")}></div>
                                <div className={cx("list-options")}>
                                    <Link to="/option">
                                        <span className={cx("option")}>
                                            About us
                                        </span>
                                    </Link>
                                    <Link to="/option">
                                        <span className={cx("option")}>
                                            Features
                                        </span>
                                    </Link>
                                    <Link to="/option">
                                        <span className={cx("option")}>
                                            Our Pricing
                                        </span>
                                    </Link>
                                    <Link to="/option">
                                        <span className={cx("option")}>
                                            Latest News
                                        </span>
                                    </Link>
                                </div>
                            </section>
                            {/* Column */}
                            <section className={cx("column")}>
                                <h2 className={cx("title")}>Support</h2>
                                <div className={cx("border")}></div>
                                <div className={cx("list-options")}>
                                    <Link to="/option">
                                        <span className={cx("option")}>
                                            FAQ’s
                                        </span>
                                    </Link>
                                    <Link to="/option">
                                        <span className={cx("option")}>
                                            Terms & Conditions
                                        </span>
                                    </Link>
                                    <Link to="/option">
                                        <span className={cx("option")}>
                                            Privacy Policy
                                        </span>
                                    </Link>
                                    <Link to="/option">
                                        <span className={cx("option")}>
                                            Contact Us
                                        </span>
                                    </Link>
                                </div>
                            </section>
                            {/* Column */}
                            <section className={cx("column")}>
                                <h2 className={cx("title")}>Address</h2>
                                <div className={cx("border")}></div>
                                <div className={cx("list-options")}>
                                    <Link to="/option">
                                        <span className={cx("option")}>
                                            <span className={cx("bold")}>
                                                Location:{" "}
                                            </span>{" "}
                                            District 9, Ho Chi Minh city
                                        </span>
                                    </Link>
                                    <Link to="/option">
                                        <span className={cx("option")}>
                                            <span className={cx("bold")}>
                                                Email:{" "}
                                            </span>
                                            tivas@gmail.com
                                        </span>
                                    </Link>
                                    <Link to="/option">
                                        <span className={cx("option")}>
                                            <span className={cx("bold")}>
                                                Phone:{" "}
                                            </span>{" "}
                                            + 000 1234 567 890
                                        </span>
                                    </Link>
                                </div>
                            </section>
                        </div>
                    </section>
                </header>
                <footer className={cx("bottom")}>
                    <div className={cx("border")}></div>
                    <span className={cx("text")}>
                        Copyright ©2024 tivas.com
                    </span>
                </footer>
            </div>
        </div>
    );
}

export default Footer;
