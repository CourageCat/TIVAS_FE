import classNames from "classnames/bind";
import styles from "./Policy.module.scss";
import React, { useState } from "react";
import Navigations from "~/components/Layouts/Navigations";
import Footer from "~/components/Layouts/Footer";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
const cx = classNames.bind(styles);
function Policy() {
  return (
    <div className={cx("wrapper")}>
      <Navigations />
      <div className={cx("policy-wrapper")}>
        <div className={cx("header-container")}>
          <div className={cx("left-content")}>
            <h1 className={cx("generate")}>Generate Your Privacy Policy</h1>
            <p className={cx("customized")}>
              Welcome to TIVAS. This Privacy Policy outlines our practices
              regarding the collection, use, and disclosure of personal
              information when you use our services. By accessing or using the
              Website, you agree to the terms outlined in this Privacy Policy.
            </p>
            <button className={cx("button")}>
              {" "}
              <svg
                className={cx("text-icon")}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M11 14H4V12H11M14 10H4V8H14M14 6H4V4H14M16 0H2C0.89 0 0 0.89 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0Z"
                  fill="white"
                />
              </svg>
              Generate Privacy Policy
            </button>
          </div>
          <div className={cx("right-content")}>
            <img className={cx("privacy-img")} src={images.privacy} alt="pic" />
          </div>
        </div>
        {/* Middle container*/}
        <div className={cx("middle-container")}>
          <h1 className={cx("compliant")}> Privacy Policy Compliant With</h1>
          <div className={cx("crumb-item")}>
            <div className={cx("crumb")}>
              <div className={cx("card-body")}>
                <img className={cx("middle-img")} src={images.gdpr} alt="pic" />
                <span className={cx("span")}>GDPR Regulations</span>
              </div>
            </div>
            <div
              style={{
                borderLeft: "1px solid #dddddd",
                borderRight: "1px solid #dddddd",
              }}
              className={cx("crumb")}
            >
              <div className={cx("card-body")}>
                <img className={cx("middle-img")} src={images.gdpr} alt="pic" />
                <span className={cx("span")}>GDPR Regulations</span>
              </div>
            </div>
            <div className={cx("crumb")}>
              <div className={cx("card-body")}>
                <img className={cx("middle-img")} src={images.gdpr} alt="pic" />
                <span className={cx("span")}>GDPR Regulations</span>
              </div>
            </div>
          </div>
          <div className={cx("crumb-button")}>
            <button className={cx("button")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M6.66699 10.8333V3.75C6.66699 3.41848 6.79869 3.10054 7.03311 2.86612C7.26753 2.6317 7.58547 2.5 7.91699 2.5C8.24851 2.5 8.56646 2.6317 8.80088 2.86612C9.0353 3.10054 9.16699 3.41848 9.16699 3.75V10M9.16699 9.58333V7.91667C9.16699 7.58515 9.29869 7.2672 9.53311 7.03278C9.76753 6.79836 10.0855 6.66667 10.417 6.66667C10.7485 6.66667 11.0665 6.79836 11.3009 7.03278C11.5353 7.2672 11.667 7.58515 11.667 7.91667V10M11.667 8.75C11.667 8.41848 11.7987 8.10054 12.0331 7.86612C12.2675 7.6317 12.5855 7.5 12.917 7.5C13.2485 7.5 13.5665 7.6317 13.8009 7.86612C14.0353 8.10054 14.167 8.41848 14.167 8.75V10"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.1667 9.58341C14.1667 9.25189 14.2984 8.93395 14.5328 8.69953C14.7672 8.46511 15.0851 8.33341 15.4167 8.33341C15.7482 8.33341 16.0661 8.46511 16.3006 8.69953C16.535 8.93395 16.6667 9.25189 16.6667 9.58341V13.3334C16.6667 14.6595 16.1399 15.9313 15.2022 16.8689C14.2645 17.8066 12.9927 18.3334 11.6667 18.3334H10H10.1733C9.34528 18.3336 8.53016 18.128 7.80115 17.7353C7.07215 17.3426 6.4521 16.775 5.99667 16.0834L5.83333 15.8334C5.57333 15.4342 4.66083 13.8434 3.095 11.0601C2.93537 10.7764 2.89274 10.4416 2.97615 10.1269C3.05957 9.8122 3.26246 9.54248 3.54167 9.37508C3.83906 9.19664 4.18756 9.12268 4.5318 9.16495C4.87604 9.20723 5.19628 9.36331 5.44167 9.60841L6.66667 10.8334M4.16667 2.50008L3.33333 1.66675M3.33333 5.83341H2.5M11.6667 2.50008L12.5 1.66675M12.5 5.00008H13.3333"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Generate Privacy Policy
            </button>
          </div>
          <div></div>
        </div>
        {/*Social container */}
        <div className={cx("social-content")}>
          <div className={cx("right-content")}>
            <img className={cx("privacy-img")} src={images.comerce} alt="pic" />
          </div>
          <div className={cx("left-content")}>
            <div className={cx("header-wrapper")}>
              <div className={cx("card-body")}>
                <h1 className={cx("generate")}>Security</h1>
                <p className={cx("customized")}>
                  We implement security measures to protect your information,
                  but we cannot guarantee absolute security.
                </p>
              </div>
              <div
                style={{
                  borderLeft: "1px solid #dddddd",
                  paddingLeft: 15,
                }}
                className={cx("card-body")}
              >
                <h1 className={cx("generate")}>Cookies and Technologies</h1>
                <p className={cx("customized")}>
                  We use cookies and similar technologies to enhance your
                  experience. You can manage cookies through your browser
                  settings.
                </p>
              </div>
            </div>
            <div className={cx("bottom-wrapper")}>
              <div className={cx("card-body")}>
                <h1 className={cx("generate")}>For Facebook pages & apps</h1>
                <p className={cx("customized")}>
                  Many platforms like facebook are requiring users that are
                  submitting their official apps to submit a Privacy Policy even
                  if you are not collecting any data from your users. Generate
                  your Privacy Policy and get your unique link to submit to
                  those platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*Review content*/}
        <div className={cx("bottom-container")}>
          <div className={cx("left-content")}>
            <h1 className={cx("generate")}>Your Choices</h1>
            <p className={cx("customized")}>
              You can control the information you provide and limit data
              processing by adjusting account settings or contacting us.
            </p>
            <p className={cx("customized")}>
              Contact Us: If you have questions or concerns please contact us at
              [Tivas@gmail.com].
            </p>
          </div>
          <div className={cx("right-content")}>
            <img
              className={cx("privacy-img")}
              src={images.generate}
              alt="pic"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Policy;
