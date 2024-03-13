import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useState } from "react";
import TippyHeadless from "@tippyjs/react/headless";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function Search() {
  const [search, setSearch] = useState("");

  const handleSetValueSearch = (e) => setSearch(e.target.value);

  return (
    <div className={cx("search-wrapper")}>
      <TippyHeadless
        placement="bottom"
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
            onChange={handleSetValueSearch}
            className={cx("search-input")}
            placeholder="Search project, location"
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

export default Search;
