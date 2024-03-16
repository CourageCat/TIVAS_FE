import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useEffect, useState } from "react";
import TippyHeadless from "@tippyjs/react/headless";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "../../hooks";
import { searchNameAndLocation } from "~/controllers/project";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Search() {
  const [search, setSearch] = useState("");
  const [openSearch, setopenSearh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const handleOpenSearch = () => {
    setopenSearh(true);
  };

  const handleCloseSearch = () => {
    setSearch("");
    setopenSearh(false);
    setLoading(false);
    setSearchResult(null);
  };

  const debounceValue = useDebounce(search, 500);

  const handleSetValueSearch = (e) => setSearch(e.target.value);

  useEffect(() => {
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);
      const result = await searchNameAndLocation(axiosInstance, {
        info: debounceValue,
        limit: 2,
      });
      if (result?.err === 0) {
        setLoading(false);
        setSearchResult(result?.data);
        console.table(result?.data);
      } else {
        setLoading(false);
        setSearchResult(null);
      }
    };
    fetchApi();
  }, [debounceValue]);

  return (
    <div className={cx("search-wrapper")}>
      <TippyHeadless
        visible={openSearch === true}
        interactive
        placement="bottom"
        render={(attrs) => (
          <div className="box" tabIndex="-1" {...attrs}>
            <div className={cx("search-result")}>
              <div className={cx("header-search")}>
                {loading === true && (
                  <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
                )}
                {loading === false && (
                  <FontAwesomeIcon
                    className={cx("search_icon")}
                    icon={faSearch}
                  />
                )}
                <h4 className={cx("heading")}>
                  {loading === false &&
                    debounceValue === "" &&
                    "Search project name or location"}
                  {loading === true && `Searching for ${debounceValue}`}
                  {loading === false &&
                    debounceValue !== "" &&
                    searchResult &&
                    `Result search for ${debounceValue}`}
                  {loading === false &&
                    debounceValue !== "" &&
                    searchResult === null &&
                    `No result for ${debounceValue}`}
                </h4>
              </div>
              <div className={cx("main-result")}>
                {/* Search for Bestmach */}
                {searchResult?.bestMatch?.length > 0 && (
                  <div className={cx("box-search")}>
                    <div className={cx("box-header")}>
                      <h4 className={cx("title")}>Best match</h4>
                    </div>
                    <div className={cx("list-box")}>
                      {searchResult?.bestMatch?.map((item, index) => (
                        <Link to={`projectdetail/${item?.id}`}>
                          <div key={index} className={cx("box-item")}>
                            <img
                              src={item?.thumbnailPathUrl}
                              alt="image_image"
                              className={cx("image")}
                            />
                            <div className={cx("content")}>
                              <h4 className={cx("name_project")}>{item?.name}</h4>
                              <div className={cx("location")}>
                                <svg
                                  className={cx("icon")}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                </svg>
                                <span className={cx("position", "text")}>
                                  {item?.Location?.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {/* Search for location */}
                {searchResult?.ProjectLocation?.length > 0 && (
                  <div className={cx("box-search")}>
                    <div className={cx("box-header")}>
                      <h4 className={cx("title")}>Location</h4>
                      <span className={cx("brow")}>See more</span>
                    </div>
                    <div className={cx("list-box")}>
                      {searchResult?.ProjectLocation?.map((item, index) => (
                        <Link to={`projectdetail/${item?.id}`}>
                          <div key={index} className={cx("box-item")}>
                            <img
                              src={item?.thumbnailPathUrl}
                              alt="image_image"
                              className={cx("image")}
                            />
                            <div className={cx("content")}>
                              <h4 className={cx("name_project")}>{item?.name}</h4>
                              <div className={cx("location")}>
                                <svg
                                  className={cx("icon")}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                </svg>
                                <span className={cx("position", "text")}>
                                  {item?.Location?.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {/* Search for Project Name */}
                {searchResult?.ProjectName?.length > 0 && (
                  <div className={cx("box-search")}>
                    <div className={cx("box-header")}>
                      <h4 className={cx("title")}>Project Name</h4>
                      <span className={cx("brow")}>See more</span>
                    </div>
                    <div className={cx("list-box")}>
                      {searchResult?.ProjectName?.map((item, index) => (
                        <Link to={`projectdetail/${item?.id}`}>
                          <div key={index} className={cx("box-item")}>
                            <img
                              src={item?.thumbnailPathUrl}
                              alt="image_image"
                              className={cx("image")}
                            />
                            <div className={cx("content")}>
                              <h4 className={cx("name_project")}>{item?.name}</h4>
                              <div className={cx("location")}>
                                <svg
                                  className={cx("icon")}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                </svg>
                                <span className={cx("position", "text")}>
                                  {item?.Location?.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        onClickOutside={handleCloseSearch}
      >
        <div className={cx("search")} onClick={handleOpenSearch}>
          {/* Input */}
          <input
            type="text"
            value={search}
            onChange={handleSetValueSearch}
            className={cx("search-input", {
              active: search !== "" ? true : false,
              open_search: openSearch,
            })}
            placeholder="Search based on project name or address, ... "
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
