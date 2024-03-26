import classNames from "classnames/bind";
import styles from "./AdminProjectStatistic.module.scss";
import * as React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { getStatisticOnStage } from "~/controllers/project";
import { useRef, useState, useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import ActionUser from "~/components/ActionUser";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";

import images from "~/assets/images";

const cx = classNames.bind(styles);

function AdminProjectStatistic() {
    const [statistic, setStatistic] = useState(null);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getStatisticOnStage(axiosInstance, id);
            setStatistic(res?.data);
        };
        fetchData();
        window.scrollTo(0, 0);
    }, []);

    const date = statistic?.array?.map((item) => {
        return `${item?.startDate}
                ${item.completedDate}`;
    });

    const revenue = statistic?.array?.map((item) => item?.revenue);

    const success = statistic?.array?.map((item) => {
        return item?.purchasedSuccessPrice;
    });
    const fail = statistic?.array?.map((item) => item?.purchasedFailedPrice);

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>TIVAS Dashboard</h1>
            <div className={cx("group-block")}>
                {/* Left block */}
                <div className={cx("block")}>
                    {/* Up Block */}
                    <div className={cx("up-block")}>
                        <div className={cx("up-block-content")}>
                            <div className={cx("price")}>
                                {
                                    statistic?.total
                                        ?.numberOfReservationTicketBought
                                }
                            </div>
                            <div className={cx("title")}>TICKETS PURCHASED</div>
                        </div>
                        <img
                            src={images.bookedIcon}
                            alt="icon"
                            className={cx("icon")}
                        />
                    </div>
                    {/* Down block */}
                    <div className={cx("down-block", "left")}>
                        <div className={cx("down-block-content")}>
                            <div className={cx("row")}></div>
                        </div>
                    </div>
                </div>

                {/* Right block */}
                <div className={cx("block")}>
                    {/* Up Block */}
                    <div className={cx("up-block")}>
                        <div className={cx("up-block-content")}>
                            <div className={cx("price", "right")}>
                                {statistic?.total?.numberOfTimeSharesBooked}
                            </div>
                            <div className={cx("title")}>BOOKED TIMESHARES</div>
                        </div>
                        <img
                            src={images.ticketIcon}
                            alt="icon"
                            className={cx("icon")}
                        />
                    </div>
                    {/* Down block */}
                    <div className={cx("down-block", "right")}>
                        <div className={cx("down-block-content")}>
                            <div className={cx("row")}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("chart-wrapper")}>
                <div className={cx("chart-heading")}>
                    PROJECT STATISTIC {id}
                </div>
                {statistic?.array?.map((item) => (
                    <div className={cx("chart-content")}>
                        <div className={cx("revenue-wrapper")}>
                            {/* Total Revenue */}
                            <div className={cx("content", "border")}>
                                <div className={cx("header", "revenue")}>
                                    TOTAL REVENUE
                                </div>
                                <div className={cx("revenue-price")}>
                                    {Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })
                                        .format(item?.revenue)
                                        .replace(".00", "")}
                                </div>
                            </div>
                            {/* Purchase Success */}
                            <div className={cx("content", "border")}>
                                <div className={cx("header")}>
                                    PURCHASE SUCCESS
                                </div>
                                <div className={cx("price")}>
                                    {Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })
                                        .format(item?.purchasedSuccessPrice)
                                        .replace(".00", "")}
                                </div>
                            </div>
                            {/* Purchase Fail */}
                            <div className={cx("content")}>
                                <div className={cx("header")}>
                                    PURCHASE FAIL
                                </div>
                                <div className={cx("price")}>
                                    {Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })
                                        .format(item?.purchasedFailedPrice)
                                        .replace(".00", "")}
                                </div>
                            </div>
                        </div>

                        <div className={cx("chart-info")}>
                            <div className={cx("text", "revenue")}>
                                Revenue in one stage{" "}
                            </div>
                            <div className={cx("text", "success")}>
                                Total purchase success price in one stage
                            </div>
                            <div className={cx("text", "fail")}>
                                {" "}
                                Total purchase fail price in one stage{" "}
                            </div>
                        </div>
                        <div className={cx("chart")}>
                            <React.StrictMode>
                                <StyledEngineProvider injectFirst>
                                    <BarChart
                                        xAxis={[
                                            {
                                                scaleType: "band",
                                                data: date,
                                            },
                                        ]}
                                        series={[
                                            { data: revenue, color: "#4650dd" },
                                            { data: success, color: "#6ea8fe" },
                                            {
                                                data: fail,
                                                color: "#d0d2f3",
                                            },
                                        ]}
                                        width={300}
                                        height={400}
                                    />
                                </StyledEngineProvider>
                            </React.StrictMode>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminProjectStatistic;
