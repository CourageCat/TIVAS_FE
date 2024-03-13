import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useState } from "react";
import TippyHeadless from "@tippyjs/react/headless";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function SearchAdmin() {
  const [search, setSearch] = useState("");

  return (
    <div className={cx("search-wrapper")}>
      <TippyHeadless
        render={(attrs) => (
          <div className="box" tabIndex="-1" {...attrs}>
            <div className={cx("search-result")}>Search result</div>
          </div>
        )}
      >
        <div className={cx("search")}>
          {/* Input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cx("search-input")}
            placeholder="Search"
          />
          {/* Icon */}
          <img
            src={images.iconSearch}
            alt="Search"
            className={cx("icon-search")}
          />
        </div>
      </TippyHeadless>
    </div>
  );
}

export default SearchAdmin;
