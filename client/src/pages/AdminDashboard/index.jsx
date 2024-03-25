import classNames from "classnames/bind";
import styles from "./AdminDashboard.module.scss";
import * as React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { LineChart } from "@mui/x-charts/LineChart";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function AdminDashboard() {
    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>TIVAS Dashboard</h1>
            <div className={cx("group-block")}>
                {/* Left block */}
                <div className={cx("block")}>
                    {/* Up Block */}
                    <div className={cx("up-block")}>
                        <div className={cx("up-block-content")}>
                            <div className={cx("price")}>38.000$</div>
                            <div className={cx("title")}>
                                Total reservation tickets
                            </div>
                        </div>
                        <img
                            src={images.iconHome}
                            alt="icon"
                            className={cx("icon")}
                        />
                    </div>
                    {/* Down block */}
                    <div className={cx("down-block")}>
                        <div className={cx("down-block-content")}>
                            <div className={cx("row")}>
                                <div className={cx("text")}>20% Increase</div>
                                <div className="icon"> 1 </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right block */}
                <div className={cx("block")}>
                    {/* Up Block */}
                    <div className={cx("up-block")}>
                        <div className={cx("up-block-content")}>
                            <div className={cx("price", "right")}>38.000$</div>
                            <div className={cx("title")}>
                                Total reservation tickets
                            </div>
                        </div>
                        <img
                            src={images.iconHome}
                            alt="icon"
                            className={cx("icon")}
                        />
                    </div>
                    {/* Down block */}
                    <div className={cx("down-block", "right")}>
                        <div className={cx("down-block-content")}>
                            <div className={cx("row")}>
                                <div className={cx("text", "right")}>
                                    20% Increase
                                </div>
                                <div className="icon"> 1 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("chart-wrapper")}>
                <div className={cx("chart-content")}>
                    <div className={cx("chart-heading")}>
                        Project statistic 10
                    </div>
                    <div className={cx("revenue-wrapper")}>
                        <div className={cx("revenue-content")}>
                            <div className={cx("header")}>TOTAL REVENUE</div>
                            <div className={cx("price")}>$19.000</div>
                        </div>
                    </div>
                    <div className={cx("chart")}>
                        <React.StrictMode>
                            <StyledEngineProvider injectFirst>
                                <LineChart
                                    xAxis={[
                                        {
                                            data: [
                                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                                11, 12,
                                            ],
                                        },
                                    ]}
                                    series={[
                                        {
                                            data: [1, 3, 2, 5, 7, 8, 3, 5],
                                        },
                                        {
                                            data: [100, 4, 2, 5, 7, 8, 3, 6],
                                        },
                                        {
                                            data: [1000, 5, 2, 5, 7, 8, 3, 6],
                                        },
                                    ]}
                                    width={800}
                                    height={400}
                                />
                            </StyledEngineProvider>
                        </React.StrictMode>
                    </div>

                    <div className={cx("chart-info")}>
                        <div className={cx("text")}>mau 1 </div>
                        <div className={cx("text")}>mau 1 </div>
                        <div className={cx("text")}>mau 1 </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
