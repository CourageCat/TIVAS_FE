import classNames from "classnames/bind";
import styles from "./FormFeedback.module.scss";
import { useState, useEffect } from "react";
import { createFeedback } from "~/controllers/feedback";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { Link, useParams } from "react-router-dom";

import images from "~/assets/images";
import { Value } from "sass";
import { toast } from "sonner";
import ToastNotify from "../ToastNotify";

const cx = classNames.bind(styles);

function FormFeedback({ handleClose, setMessage }) {
    const [feedback, setFeedback] = useState("");

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.user);
    const axiosInstance = createAxios(dispatch, currentUser);

    const handleFeedback = (value) => {
        setFeedback(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (feedback === "") {
            return toast.custom(
                () => (
                    <ToastNotify
                        type="error"
                        title="Error"
                        desc={"Please fill in feedback"}
                    />
                ),
                { duration: 2000 }
            );
        }
        const form = {
            userID: currentUser?.data?.id,
            content: feedback,
        };
        const res = await createFeedback(axiosInstance, form);
        if (res) {
            handleClose();
        }
        setMessage(res);
    };

    return (
        <div className={cx("wrapper")}>
            <form className={cx("content")} onSubmit={handleSubmit}>
                <label htmlFor="desc" className={cx("text")}>
                    Please tell us your feedback!
                </label>
                <textarea
                    name="text"
                    id="desc"
                    cols="50"
                    rows="10"
                    placeholder="Feedback here!"
                    className={cx("desc")}
                    onChange={(e) => {
                        handleFeedback(e.target.value);
                    }}
                />

                <button type="submit" className={cx("submit-btn")}>
                    Submit Feedback
                </button>
            </form>
        </div>
    );
}

export default FormFeedback;
