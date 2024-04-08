import classNames from "classnames/bind";
import styles from "./Banking.module.scss";

import images from "~/assets/images";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBankingUser } from "~/controllers/user";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { Backdrop, CircularProgress } from "@mui/material";

const cx = classNames.bind(styles);

function Banking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);
  const [infoBank, setInfoBank] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBankingUser(
        axiosInstance,
        currentUser?.data?.username
      );
      if (res?.err === 0) setInfoBank(res.data);
      else setInfoBank({});
      setIsLoading(true);
    };
    fetchData();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("heading")}>Banking</h2>
      <div className={cx("banking-wrapper")}>
        <div className={cx("form")}>
          <section className={cx("banking-card")}>
            <div className={cx("card-wrapper")}>
              {infoBank?.brand === "visa" ? (
                <img
                  src={images.visaImage}
                  alt="master-card"
                  className={cx("img-visa")}
                />
              ) : (
                <img
                  src={images.masterCard}
                  alt="master-card"
                  className={cx("img-mastercard")}
                />
              )}

              <div className={cx("card-info")}>
                <h3 className={cx("card-id")}>
                  {infoBank?.brand === "visa" ? "VISA" : "Mastercard"} ••••{" "}
                  {infoBank?.last4}
                </h3>
                <div className={cx("exp")}>
                  <span>
                    Expires{" "}
                    {infoBank?.exp_month < 10
                      ? `0${infoBank?.exp_month}`
                      : infoBank?.exp_month}
                    /{infoBank?.exp_year}
                  </span>
                </div>
              </div>
            </div>
          </section>
          <div className={cx("text-wrapper")}>
            <div className={cx("text")}>Primary</div>
          </div>
        </div>
      </div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={!isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Banking;
