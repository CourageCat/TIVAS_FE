import classNames from "classnames/bind";
import styles from "./SearchPage.module.scss";
import { useState } from "react";
import TippyHeadless from "@tippyjs/react/headless";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function SearchPage() {
    const [searchPage, setSearchPage] = useState("");

    return (
        <div className={cx("search-page-wrapper")}>
            <TippyHeadless
                render={(attrs) => (
                    <div
                        className={cx("search-result")}
                        tabIndex="-1"
                        {...attrs}
                    >
                        Search result
                    </div>
                )}
            >
                <div className={cx("search-page")}>
                    {/* Input */}
                    <input
                        type="text"
                        value={searchPage}
                        onChange={(e) => setSearchPage(e.target.value)}
                        className={cx("search-input")}
                        placeholder="Search"
                    />
                    {/* Icon */}
                    <img
                        src={images.iconSearch}
                        alt="Search"
                        className={cx("icon-search")}
                    />
                    <button className={cx("btn-search")}>SEARCH</button>
                </div>
            </TippyHeadless>
        </div>
    );
}

export default SearchPage;
