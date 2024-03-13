import classNames from "classnames/bind";
import styles from "./PageOwner.module.scss";
import images from "~/assets";
const cx = classNames.bind(styles);

function PageOwner() {
    return (
        <div className={cx("owner-intro")}>    
                <div className={cx("header-slogan")}>
                    <span className={cx("tivas-product")} style={{display: 'flex', justifyContent: 'center',}}>
                        TIVAS'S PRODUCT
                    </span>
                    <span className={cx("tivas-text")}>
                    Celebrate in opulent splendor within our exquisite suite.
                    </span>
                </div>
                <div className={cx("father")}>
                <div className={cx("body")}>
                    <div className={cx("item")}>
                    <img className={cx("box-img")} src={(images.pageOwner)} alt="pic" />
                    <div className={cx("info")}>
                        <span className={cx("description")}>
                            Royal Vila 
                        </span>
                        <span className={cx("description")}>
                            (1 Personal)
                        </span>
                        <div className={cx("button")}> <span style={{fontFamily: 'Poppins', fontWeight: 500}}>Reservation</span></div>
                    </div>
                    </div>
                </div>
                <div className={cx("body")}>
                    <div className={cx("item")}>
                    <img className={cx("box-img")} src={(images.pageOwner)} alt="pic" />
                    <div className={cx("info")}>
                        <span className={cx("description")}>
                            Royal Vila 
                        </span>
                        <span className={cx("description")}>
                            (1 Personal)
                        </span>
                        <div className={cx("button")}> <span style={{fontFamily: 'Poppins', fontWeight: 500}}>Reservation</span></div>
                    </div>
                    </div>
                </div>
                <div className={cx("body")}>
                    <div className={cx("item")}>
                    <img className={cx("box-img")} src={(images.pageOwner)} alt="pic" />
                    <div className={cx("info")}>
                        <span className={cx("description")}>
                            Royal Vila 
                        </span>
                        <span className={cx("description")}>
                            (1 Personal)
                        </span>
                        <div className={cx("button")}> <span style={{fontFamily: 'Poppins', fontWeight: 500}}>Reservation</span></div>
                    </div>
                    </div>
                </div>
                <div className={cx("body")}>
                    <div className={cx("item")}>
                    <img className={cx("box-img")} src={(images.pageOwner)} alt="pic" />
                    <div className={cx("info")}>
                        <span className={cx("description")}>
                            Royal Vila 
                        </span>
                        <span className={cx("description")}>
                            (1 Personal)
                        </span>
                        <div className={cx("button")}> <span style={{fontFamily: 'Poppins', fontWeight: 500}}>Reservation</span></div>
                    </div>
                    </div>
                </div>
                </div>
        </div>

    );
}

export default PageOwner;